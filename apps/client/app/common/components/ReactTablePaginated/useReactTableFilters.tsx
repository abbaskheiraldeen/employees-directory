import type { InputItemDataType } from "rsuite/esm/InputPicker";
import InputPicker from "rsuite/esm/InputPicker";
import { useQueryStrings } from "@/hooks/utility-hooks/useQueryStrings";
import DebouncedInput from "../Inputs/DebouncedInput";

interface UseReactTableFiltersProps {
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

export default function useReactTableFilters({
  searchInput,
  filters,
}: UseReactTableFiltersProps) {
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
            onChange={(v: any) =>
              appendQueries({ [searchInput?.fieldName!]: v })
            }
            placeholder={searchInput?.placeholder}
          />
        )}

        {filters?.map((filter) => (
          <div key={filter.fieldName} className="mb-4">
            <label
              htmlFor={filter.fieldName}
              className="block mb-1 text-sm font-medium text-text-secondary"
            >
              {filter.placeholder}
            </label>
            <InputPicker
              id={filter.fieldName}
              placeholder={filter.placeholder}
              data={filter.options}
              cleanable
              block
              value={
                typeof filter.options[0]?.value === "number"
                  ? Number(prevQueries[filter.fieldName])
                  : prevQueries[filter.fieldName] || ""
              }
              onChange={(v) => appendQueries({ [filter.fieldName]: v })}
            />
          </div>
        ))}
      </section>
    ),
  };
}
