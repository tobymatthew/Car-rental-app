import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { HostListing } from "../domain/hostListing";
import {
  emptyHostListingDraft,
  listingToDraft,
  type HostListingDraft,
} from "../domain/listingDraft";

type Value = {
  draft: HostListingDraft;
  listingId?: string;
  step: number;
  updateDraft: (changes: Partial<HostListingDraft>) => void;
  toggleFeature: (feature: HostListingDraft["features"][number]) => void;
  initializeNew: () => void;
  initializeEdit: (listing: HostListing) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
};
const Context = createContext<Value | null>(null);
export const listingDraftStepCount = 6;

export function HostListingDraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState(emptyHostListingDraft);
  const [listingId, setListingId] = useState<string>();
  const [step, setStep] = useState(0);
  const reset = useCallback(() => {
    setDraft(emptyHostListingDraft);
    setListingId(undefined);
    setStep(0);
  }, []);
  const updateDraft = useCallback(
    (changes: Partial<HostListingDraft>) => setDraft((current) => ({ ...current, ...changes })),
    [],
  );
  const toggleFeature = useCallback((feature: HostListingDraft["features"][number]) => {
    setDraft((current) => ({
      ...current,
      features: current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features, feature],
    }));
  }, []);
  const initializeEdit = useCallback((listing: HostListing) => {
    setDraft(listingToDraft(listing));
    setListingId(listing.id);
    setStep(0);
  }, []);
  const nextStep = useCallback(
    () => setStep((current) => Math.min(listingDraftStepCount - 1, current + 1)),
    [],
  );
  const previousStep = useCallback(() => setStep((current) => Math.max(0, current - 1)), []);
  const value = useMemo<Value>(
    () => ({
      draft,
      listingId,
      step,
      updateDraft,
      toggleFeature,
      initializeNew: reset,
      initializeEdit,
      nextStep,
      previousStep,
      reset,
    }),
    [
      draft,
      initializeEdit,
      listingId,
      nextStep,
      previousStep,
      reset,
      step,
      toggleFeature,
      updateDraft,
    ],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useHostListingDraft() {
  const value = useContext(Context);
  if (!value) throw new Error("useHostListingDraft must be used within HostListingDraftProvider.");
  return value;
}
