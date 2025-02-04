import React from "react";
import { Button } from "@/components/ui/button";
import "./Styles.css";

interface SearchFormProps {
  queryValue: string;
  setQueryValue: (value: string) => void;
  searchDNI: (event: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  queryValue,
  setQueryValue,
  searchDNI,
}) => {
  return (
    <form onSubmit={searchDNI} className="w-full">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <input
            type="search"
            id="default-search"
            className="font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white focus:border-primaryblue m-0"
            placeholder="Ingrese su nombre completo"
            required
            onChange={(e) => setQueryValue(e.target.value)}
            value={queryValue}
          />
        </div>
        <div className="ml-2 h-full">
          <Button
            type="submit"
            className="bg-customBlue dark:bg-customDark text-white border border-white/50 rounded-lg"
          >
            Buscar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
