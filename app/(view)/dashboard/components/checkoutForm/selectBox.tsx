import React, { useState,useEffect } from "react";
// import "./app.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";

import {
    GetCountries,
    GetState,
    GetCity,
    GetLanguages, //async functions
  } from "react-country-state-city";


import "react-country-state-city/dist/react-country-state-city.css";

export default function App() {
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);

  const [countriesList, setCountriesList] = useState<any>([]);


  useEffect(() => {
    GetCountries().then((result:any) => {
        setCountriesList(result);
    });

    {countriesList.length > 0 ? countriesList.map((item:any, index:number) => {
        console.log(item.name);
    }):""
    }

  }, []);


  return (
   
    <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="text-xs font-semibold text-gray-500" htmlFor="grid-city">
          Country
        </label>

        <select name="country" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city"
        value={countryid}
        >
            <option></option>
            {countriesList.length > 0 ? countriesList.map((item:any, index:number) => (
                <option key={index} value={index}>
                    {item.emoji}   {item.name}
                </option>
            )):""
            }

        </select>
        {/* <input name="country" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="Country"
         value={formValue.country}
         onChange={(e) => handleChange(e)}
        /> */}
       
      </div>
    </div>
  );
}