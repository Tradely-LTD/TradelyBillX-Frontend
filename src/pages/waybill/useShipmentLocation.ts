import { useGetLGAsQuery, useGetStatesQuery, useGetTownsQuery } from "../location/location.api";

export const useShipmentLocation = ({ selectedStateId, selectedLGAId }) => {
  const { data: statesData, isLoading: isStatesLoading } = useGetStatesQuery();
  const {
    data: lgasData,
    isLoading: isLGALoading,
    isFetching: isFetchingLGA,
  } = useGetLGAsQuery({ stateId: selectedStateId ?? "" }, { skip: selectedStateId === null });
  const { data: towns, isLoading: isLoadingTown } = useGetTownsQuery(
    {
      lgaId: selectedLGAId ?? "",
    },
    { skip: selectedLGAId === null }
  );

  return {
    isFetchingLGA,
    isLGALoading,
    lgasData,
    statesData,
    towns,
    isLoadingTown,
    isStatesLoading,
  };
};
