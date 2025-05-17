import { useQueryStrings } from "@/hooks/useQueryStrings";
import type { InputItemDataType } from "rsuite/esm/InputPicker";
import InputPicker from "rsuite/esm/InputPicker";
import DebouncedInput from "../Inputs/DebouncedInput";

interface UseReacTableFiltersProps {
  searchInput: {
    fieldName: string;
    placeholder?: string;
  };
  filters?: {
    fieldName: string;
    placeholder?: string;
    type?: "single" | "multi";
    options: InputItemDataType[];
  }[];
}

export default function useReacTableFilters({
  searchInput,
  filters,
}: UseReacTableFiltersProps) {
  const { prevQueries, appendQueries } = useQueryStrings();

  const searchInputValue = prevQueries[searchInput?.fieldName!] || "";
  const filtersValues = filters?.reduce(
    (acc, filter) => {
      acc[filter.fieldName] = prevQueries[filter.fieldName];
      return acc;
    },
    {} as Record<string, any>
  );

  return {
    searchInputValue,
    filtersValues,

    filters: (
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mb-2">
        {searchInput?.fieldName && (
          <DebouncedInput
            value={searchInputValue}
            onChange={(v) => appendQueries({ [searchInput?.fieldName!]: v })}
            placeholder={searchInput?.placeholder}
          />
        )}
        {filters?.map((filter) => (
          <InputPicker
            key={filter.fieldName}
            placeholder={filter.placeholder}
            data={filter.options}
            value={
              // in case the values are numbers, we should convert since they're coming from the query string
              typeof filter.options[0]?.value === "number"
                ? Number(prevQueries[filter.fieldName])
                : prevQueries[filter.fieldName] || ""
            }
            onChange={(v) => appendQueries({ [filter.fieldName]: v })}
          />
        ))}
      </section>
    ),
  };
}
