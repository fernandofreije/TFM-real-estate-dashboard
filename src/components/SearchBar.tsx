import fetch from 'node-fetch';
import { ReactElement, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import styles from '../styles/SearchBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchBar(props: JSX.IntrinsicAttributes): ReactElement {
  const router = useRouter();

  const [provinces, setProvinces] = useState([]);

  const requestProvinces = async () => {
    if (provinces.length === 0) {
      console.log('entra');
      const response = await fetch('/api/provinces');
      if (response.ok) {
        setProvinces(await response.json());
      }
    }
  };

  const getSuggestions = async (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    console.log(provinces);

    await requestProvinces();

    console.log(provinces);

    return inputLength === 0
      ? []
      : provinces.filter((provinces) => provinces.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion) => suggestion;
  const renderSuggestion = (suggestion) => (
    <Link href={`/province/${suggestion === 'España' ? 'all' : suggestion}`}>
      <span>{suggestion}</span>
    </Link>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(await getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = () => {
    if (suggestions.includes(value)) {
      router.push(`/province/${value === 'España' ? 'all' : value}`);
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
      className={styles.container}
    />
  );
}
