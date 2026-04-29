import React, { useState } from "react";
import "./autocomplete.css";

const diseasesList = [
  "Avarakkai-leaf spot",
  "Avarakkai-pod borer",
  "Lemon - Leaf Eating Caterpillar Damage",
  "ajwain-pest feeding holes",
  "aloe rust",
  "blue pea-mosaic virus",
  "blue pea-powdery mildew",
  "brinjal-leaf blight",
  "chilli-fungal disease",
  "cockscomb-leaf spot",
  "coconut-bud rot",
  "curry leaf-fungal infection",
  "curry leaf-iron deficient",
  "guava-leaf miner",
  "guava-scab fungal disease",
  "hibiscus-bacterial leaf spot",
  "hibiscus-healthy",
  "hibiscus-leaf blight",
  "hibiscus-nitrogen deficient",
  "jasmine-fungal blight",
  "jasmine-leaf miner damage",
  "maize-fall armyworm damage",
  "mango-anthracnose",
  "mango-gall midge",
  "mango-leaf hopper",
  "mango-powdery mildew",
  "marsh barbel-leaf webbers",
  "mosambi-citrus canker fungal",
  "neem-dieback disease",
  "papaya-necrotic spots",
  "papaya-powdery mildew",
  "pomegranate-bacterial leaf spot",
  "sapota-leaf eating caterpillar",
  "tomato-leaf miner"
];

export default function DiseaseAutoComplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Support comma separated → take last word
    const lastWord = value.split(",").pop().trim().toLowerCase();

    if (lastWord.length > 0) {
      const suggestions = diseasesList.filter((d) =>
        d.toLowerCase().includes(lastWord)
      );
      setFiltered(suggestions);
    } else {
      setFiltered([]);
    }

    onSelect(value);
  };

  const handleSelect = (disease) => {
    let parts = query.split(",");
    parts[parts.length - 1] = " " + disease;
    const newValue = parts.join(",").trim().replace(/^,/, "");

    setQuery(newValue);
    setFiltered([]);
    onSelect(newValue);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        placeholder="🌿 Type plant disease (e.g., Rice Blast, Brown Spot)"
        value={query}
        onChange={handleChange}
        className="autocomplete-input"
      />

      {filtered.length > 0 && (
        <div className="autocomplete-dropdown">
          {filtered.map((d, i) => (
            <div
              key={i}
              className="autocomplete-item"
              onClick={() => handleSelect(d)}
            >
              {d}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
