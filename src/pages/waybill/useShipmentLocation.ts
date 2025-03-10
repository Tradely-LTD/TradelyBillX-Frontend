import { useGetLGAsQuery, useGetStatesQuery, useGetMarketQuery } from "../location/location.api";

interface props {
  selectedStateId: string;
  selectedLGAId?: string;
}
export const useShipmentLocation = ({ selectedStateId, selectedLGAId }: props) => {
  const { data: statesData, isLoading: isStatesLoading } = useGetStatesQuery();
  const {
    data: lgasData,
    isLoading: isLGALoading,
    isFetching: isFetchingLGA,
  } = useGetLGAsQuery({ stateId: selectedStateId ?? "" }, { skip: selectedStateId === null });
  const { data: towns, isLoading: isLoadingTown } = useGetMarketQuery(
    {
      lgaId: selectedLGAId ?? "",
    },
    { skip: selectedLGAId === null || selectedLGAId === "" }
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
