import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Modal } from "@/components/ui/Modal";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { colors, spacing } from "@/design-system/tokens";
import { formatNaira } from "@/features/bookings/domain/calculateQuote";
import { tripRequestStatusLabels, type TripRequest } from "../domain/tripRequest";
import type { HostTripRequestRepository } from "../repositories/hostTripRequestRepository";
import { hostTripRequestRepository } from "../repositories/mockHostTripRequestRepository";

export function TripRequestDetailScreen({
  requestId,
  repository = hostTripRequestRepository,
}: {
  requestId: string;
  repository?: HostTripRequestRepository;
}) {
  const router = useRouter();
  const [request, setRequest] = useState<TripRequest | null | undefined>();
  const [decision, setDecision] = useState<"approved" | "declined">();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    repository
      .getTripRequest(requestId)
      .then(setRequest)
      .catch(() => setRequest(null));
  }, [repository, requestId]);
  if (request === undefined)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock trip request" />
      </Screen>
    );
  if (!request)
    return (
      <Screen>
        <FeedbackState kind="empty" title="Mock trip request not found" />
      </Screen>
    );
  const confirm = async () => {
    if (!decision) return;
    setSaving(true);
    setError(undefined);
    try {
      const updated = await repository.updateMockRequestStatus({
        requestId: request.id,
        nextStatus: decision,
        actionKey: `host-request:${request.id}:${decision}`,
      });
      setRequest(updated);
      setDecision(undefined);
      setSaving(false);
    } catch {
      setError("Couldn't update this mock request. Retry uses the same safe action key.");
      setSaving(false);
    }
  };
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar title="Trip request" onBack={() => router.back()} />
      <Badge
        label={tripRequestStatusLabels[request.status]}
        tone={
          request.status === "pending"
            ? "warning"
            : request.status === "declined"
              ? "error"
              : "success"
        }
      />
      <Card childrenStyle={styles.card}>
        <AppText variant="title">{request.vehicleName}</AppText>
        <AppText>{request.renterDisplayName}</AppText>
        <AppText>
          {request.startDate} → {request.endDate}
        </AppText>
        <AppText tone="secondary">
          {request.pickupLocation} → {request.dropOffLocation}
        </AppText>
        <AppText variant="price">{formatNaira(request.estimatedTotalNgn)} mock estimate</AppText>
      </Card>
      <AppText tone="secondary">
        Approving or declining changes only this local host fixture. It does not reserve
        availability, notify a renter, or charge money.
      </AppText>
      {request.status === "pending" ? (
        <View style={styles.actions}>
          <Button
            label="Approve mock request"
            onPress={() => {
              setError(undefined);
              setDecision("approved");
            }}
          />
          <Button
            label="Decline mock request"
            variant="destructive"
            onPress={() => {
              setError(undefined);
              setDecision("declined");
            }}
          />
        </View>
      ) : (
        <AppText accessibilityLiveRegion="polite">This request is no longer actionable.</AppText>
      )}
      <Button
        label="Back to mock requests"
        variant="secondary"
        onPress={() => router.replace("/(host)/host/trip-requests")}
      />
      <Modal
        visible={Boolean(decision)}
        title={`${decision === "approved" ? "Approve" : "Decline"} mock request?`}
        onRequestClose={() => !saving && setDecision(undefined)}
      >
        <AppText>This affects only the local mock request for {request.vehicleName}.</AppText>
        {error ? (
          <AppText accessibilityRole="alert" style={styles.error}>
            {error}
          </AppText>
        ) : null}
        <Button
          label={
            error
              ? "Retry mock update"
              : `Confirm ${decision === "approved" ? "approval" : "decline"}`
          }
          loading={saving}
          onPress={confirm}
        />
        <Button
          label="Keep pending"
          variant="secondary"
          disabled={saving}
          onPress={() => setDecision(undefined)}
        />
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[4] },
  card: { gap: spacing[2] },
  actions: { gap: spacing[2] },
  error: { color: colors.feedback.error },
});
