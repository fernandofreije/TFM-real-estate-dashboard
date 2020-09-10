import fetch from 'node-fetch';
import { ReactElement, useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import styles from '../styles/SearchBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchBar(props: JSX.IntrinsicAttributes): ReactElement {
  const router = useRouter();

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    requestProvinces();
  }, []);

  const requestProvinces = async () => {
    if (provinces.length === 0) {
      const response = await fetch('/api/provinces');
      if (response.ok) {
        setProvinces(await response.json());
      }
    }
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : provinces.filter(
          (province) => (province === 'all' ? 'españa' : province.toLowerCase()).slice(0, inputLength) === inputValue,
        );
  };

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion) => (suggestion === 'all' ? 'España' : suggestion);
  const renderSuggestion = (suggestion) => (
    <Link href={`/province/${suggestion.toLowerCase() === 'españa' ? 'all' : suggestion}`}>
      <a>{suggestion === 'all' ? 'España' : suggestion}</a>
    </Link>
  );

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = () => {
    if (suggestions.includes(value) || value.toLowerCase() === 'españa') {
      router.push(`/province/${value.toLowerCase() === 'españa' ? 'all' : value}`);
    }
  };

  const inputProps = {
    placeholder: 'Type a location',
    value,
    onChange,
  };

  return (
    <Autosuggest
      theme={styles}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      {...props}
    />
  );
}
