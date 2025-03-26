"use client"

import { useEffect, useState } from "react";

export default function Dropdown({
  setSelectedCountryCode,
  setDropdownOpen,
}) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/utils/countryCode.json')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleClick(code, dialCode) {
    setSelectedCountryCode(dialCode);
    setDropdownOpen(false);
  }

  return(
    <div className="absolute left-0 right-0 top-8 bg-white border border-[1.5px] py-1 px-3 rounded-lg h-25 overflow-y-auto overflow-x-hidden">
      <table className="border-0 table-auto">
        <tbody>
          {countries.map((country) => (
            <tr key={country.code} className="py-1" onClick={() => handleClick(country.code, country.dial_code)}>
              <td className="pe-3">
                {country.dial_code}
              </td>
              <td>
                {country.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}