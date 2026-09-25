import { useRouter } from "expo-router";
import { useEffect, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TextField } from "@/components/ui/TextField";
import { TopBar } from "@/components/ui/TopBar";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { colors, spacing } from "@/design-system/tokens";
import { formatNaira } from "@/features/bookings/domain/calculateQuote";
import {
  listingAvailabilityLabels,
  listingCategoryLabels,
  listingFeatureLabels,
  type ListingAvailability,
  type ListingCategory,
  type ListingFeatureId,
  type ListingImage,
} from "../domain/hostListing";
import {
  toValidListingDraft,
  validateListingDraft,
  type HostListingDraftErrors,
} from "../domain/listingDraft";
import { mockListingMediaAdapter } from "../media/mockListingMediaAdapter";
import { hostListingRepository } from "../repositories/mockHostListingRepository";
import type { HostListingRepository } from "../repositories/hostListingRepository";
import { listingDraftStepCount, useHostListingDraft } from "../state/HostListingDraftProvider";

const stepFields: (keyof HostListingDraftErrors)[][] = [
  ["make", "model", "year"],
  ["features"],
  ["pickupLocation"],
  ["dailyRateNgn"],
  ["imageId"],
  [],
];
const categories = Object.keys(listingCategoryLabels) as ListingCategory[];
const features = Object.keys(listingFeatureLabels) as ListingFeatureId[];
const availability = Object.keys(listingAvailabilityLabels) as ListingAvailability[];

export function ListingDraftScreen({
  listingId: routeListingId,
  repository = hostListingRepository,
}: {
  listingId?: string;
  repository?: HostListingRepository;
}) {
  const router = useRouter();
  const flow = useHostListingDraft();
  const { initializeEdit } = flow;
  const [errors, setErrors] = useState<HostListingDraftErrors>({});
  const [media, setMedia] = useState<ListingImage[]>([]);
  const [loadState, setLoadState] = useState<"ready" | "loading" | "error">(
    routeListingId ? "loading" : "ready",
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string>();
  const [retryVersion, retryLoad] = useReducer((value: number) => value + 1, 0);
  useEffect(() => {
    mockListingMediaAdapter.listOptions().then(setMedia);
  }, []);
  useEffect(() => {
    if (!routeListingId) return;
    repository
      .getListing(routeListingId)
      .then((listing) => {
        if (!listing) {
          setLoadState("error");
          return;
        }
        initializeEdit(listing);
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, [initializeEdit, repository, retryVersion, routeListingId]);
  if (loadState === "loading")
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock listing draft" />
      </Screen>
    );
  if (loadState === "error")
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Couldn't load the mock listing to edit"
          onRetry={() => {
            setLoadState("loading");
            retryLoad();
          }}
        />
      </Screen>
    );
  const currentErrors = validateListingDraft(flow.draft);
  const next = () => {
    const visibleErrors = Object.fromEntries(
      stepFields[flow.step]
        .filter((field) => currentErrors[field])
        .map((field) => [field, currentErrors[field]]),
    );
    setErrors(visibleErrors);
    if (!Object.keys(visibleErrors).length) flow.nextStep();
  };
  const selectedImage = media.find((image) => image.id === flow.draft.imageId) ?? null;
  const publish = async () => {
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length) return;
    setSaving(true);
    setSaveError(undefined);
    try {
      const listing = await repository.saveMockListing({
        listingId: flow.listingId,
        draft: toValidListingDraft(flow.draft, selectedImage),
      });
      flow.reset();
      router.replace(`/(host)/host/listings/${listing.id}`);
    } catch {
      setSaveError("Couldn't save this mock listing. Your draft is still here.");
      setSaving(false);
    }
  };
  const cancel = () => {
    flow.reset();
    router.replace("/(host)/host");
  };
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar title={routeListingId ? "Edit car" : "List your car"} onBack={cancel} />
      <View>
        <AppText variant="heading">
          {routeListingId ? "Edit mock listing" : "Create mock listing"}
        </AppText>
        <AppText accessibilityLiveRegion="polite" tone="secondary">
          Step {flow.step + 1} of {listingDraftStepCount}. Unsaved changes stay only in this listing
          flow.
        </AppText>
      </View>
      <Card childrenStyle={styles.form}>
        {flow.step === 0 ? (
          <>
            <TextField
              label="Vehicle make"
              required
              value={flow.draft.make}
              onChangeText={(make) => flow.updateDraft({ make })}
              error={errors.make}
            />
            <TextField
              label="Vehicle model"
              required
              value={flow.draft.model}
              onChangeText={(model) => flow.updateDraft({ model })}
              error={errors.model}
            />
            <TextField
              label="Vehicle year"
              required
              keyboardType="number-pad"
              value={flow.draft.year}
              onChangeText={(year) => flow.updateDraft({ year })}
              error={errors.year}
            />
            <AppText variant="captionStrong">Category</AppText>
            <View style={styles.choices}>
              {categories.map((category) => (
                <Button
                  key={category}
                  label={listingCategoryLabels[category]}
                  variant={flow.draft.category === category ? "primary" : "secondary"}
                  accessibilityState={{ selected: flow.draft.category === category }}
                  onPress={() => flow.updateDraft({ category })}
                />
              ))}
            </View>
          </>
        ) : null}
        {flow.step === 1 ? (
          <>
            <AppText variant="title">Structured features</AppText>
            <AppText tone="secondary">
              Choose at least one. Free-form feature parsing is intentionally unavailable.
            </AppText>
            <View style={styles.choices}>
              {features.map((feature) => (
                <Button
                  key={feature}
                  label={listingFeatureLabels[feature]}
                  variant={flow.draft.features.includes(feature) ? "primary" : "secondary"}
                  accessibilityState={{ selected: flow.draft.features.includes(feature) }}
                  onPress={() => flow.toggleFeature(feature)}
                />
              ))}
            </View>
            {errors.features ? <AppText style={styles.error}>{errors.features}</AppText> : null}
          </>
        ) : null}
        {flow.step === 2 ? (
          <>
            <TextField
              label="Mock pickup location"
              required
              value={flow.draft.pickupLocation}
              onChangeText={(pickupLocation) => flow.updateDraft({ pickupLocation })}
              error={errors.pickupLocation}
              hint="Display text only; no map, routing, or coverage guarantee."
            />
            <AppText variant="captionStrong">Simple mock availability</AppText>
            <View style={styles.choices}>
              {availability.map((option) => (
                <Button
                  key={option}
                  label={listingAvailabilityLabels[option]}
                  variant={flow.draft.availability === option ? "primary" : "secondary"}
                  accessibilityState={{ selected: flow.draft.availability === option }}
                  onPress={() => flow.updateDraft({ availability: option })}
                />
              ))}
            </View>
          </>
        ) : null}
        {flow.step === 3 ? (
          <>
            <TextField
              label="Mock daily rate (₦)"
              required
              keyboardType="number-pad"
              value={flow.draft.dailyRateNgn}
              onChangeText={(dailyRateNgn) => flow.updateDraft({ dailyRateNgn })}
              error={errors.dailyRateNgn}
              hint="Positive whole-naira display policy only; not a payout guarantee."
            />
          </>
        ) : null}
        {flow.step === 4 ? (
          <>
            <AppText variant="title">Mock media placeholder</AppText>
            <AppText tone="secondary">
              Choose a bundled placeholder label. No file is selected or uploaded.
            </AppText>
            {media.map((image) => (
              <Card
                key={image.id}
                onPress={() => flow.updateDraft({ imageId: image.id })}
                accessibilityLabel={`Choose ${image.label}`}
                childrenStyle={styles.media}
              >
                <VehicleImage label={image.label} source={image.source} />
                <AppText variant="bodyStrong">{image.label}</AppText>
                {flow.draft.imageId === image.id ? <AppText tone="link">Selected</AppText> : null}
              </Card>
            ))}
          </>
        ) : null}
        {flow.step === 5 ? (
          <>
            <AppText variant="title">Review mock listing</AppText>
            <AppText>
              {flow.draft.year} {flow.draft.make} {flow.draft.model} ·{" "}
              {listingCategoryLabels[flow.draft.category]}
            </AppText>
            <AppText>
              {flow.draft.pickupLocation} · {listingAvailabilityLabels[flow.draft.availability]}
            </AppText>
            <AppText>
              {flow.draft.features.map((feature) => listingFeatureLabels[feature]).join(" · ")}
            </AppText>
            <AppText variant="price">
              {formatNaira(Number(flow.draft.dailyRateNgn) || 0)} / mock day
            </AppText>
            <AppText tone="secondary">
              “Publish mock listing” saves locally for testing. It does not create a public,
              verified, or rentable listing.
            </AppText>
          </>
        ) : null}
      </Card>
      {saveError ? (
        <AppText accessibilityRole="alert" style={styles.error}>
          {saveError}
        </AppText>
      ) : null}
      {flow.step === listingDraftStepCount - 1 ? (
        <Button label="Publish mock listing" loading={saving} onPress={publish} />
      ) : (
        <Button label="Continue" onPress={next} />
      )}
      {flow.step > 0 ? (
        <Button
          label="Previous step"
          variant="secondary"
          disabled={saving}
          onPress={flow.previousStep}
        />
      ) : null}
      <Button
        label="Cancel and clear draft"
        variant="tertiary"
        disabled={saving}
        onPress={cancel}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[4] },
  form: { gap: spacing[4] },
  choices: { gap: spacing[2] },
  media: { gap: spacing[2] },
  error: { color: colors.feedback.error },
});
