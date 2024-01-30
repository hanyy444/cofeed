import "./suggestions.component.scss";
import { useState, useCallback } from "react";
import {
  selectSuggestions,
  selectSuggestionsStatus,
  selectSuggestionsError,
} from "redux/slices/users.slice";
import { userApi } from "redux/slices/users.slice";

import Suggestion from "./suggestion";
import Subtitle from "components/typography/subtitle/subtitle.component";
import useQuery from "hooks/useQuery";

import WithStateHandler from "utils/withStateHandler";
import { useSelector } from "react-redux";

const Suggestions = () => {
  const [limit, setLimit] = useState(3);
  const suggestionsStatus = useSelector(
    selectSuggestionsStatus
  );
  const suggestionsError = useSelector(
    selectSuggestionsError
  );
  const suggestions = useQuery({
    selector: selectSuggestions,
    thunk: {
      action: userApi.getSuggestions,
      params: {
        path: "suggestions",
        query: `limit=${limit}`,
      },
    },
    extraDeps: [limit],
  });
  const handleSuggestionsLimit = useCallback(() => {
    setLimit((prevLimit) => (prevLimit === 3 ? 0 : 3));
  }, []);

  const renderedSuggestions = suggestions.map(
    ({ _id: userId, firstName, lastName, image }, idx) => (
      <Suggestion
        key={`suggestion-${idx}`}
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        imageUrl={image?.url}
      />
    )
  );

  return (
    <div className="suggestions" data-testid="suggestions">
      <Subtitle>Suggestions For You</Subtitle>
      <button
        type="button"
        className="explore__link"
        onClick={handleSuggestionsLimit}
      >
        See {limit === 3 ? "All" : "Less"}
      </button>
      <WithStateHandler
        data={suggestions}
        loading={suggestionsStatus}
        error={suggestionsError}
      >
        {renderedSuggestions}
      </WithStateHandler>
    </div>
  );
};

export default Suggestions;
