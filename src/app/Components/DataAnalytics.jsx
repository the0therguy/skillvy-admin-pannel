"use client";
import {useEffect, useState} from "react";
import baseURL from "@/app/Components/BaseURL";
import NumberTicker from "@/components/ui/number-ticker";

export default function DataAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}data-numbers/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);


  const renderValue = (value) => {
    if (value === 0) {
      return (
        <span className="inline-block tabular-nums text-black dark:text-white tracking-wider">
          0
        </span>
      );
    }
    return <NumberTicker value={value}/>;
  };

  return (
    <div className="mt-5 mb-5">
      {data ? (
        <div className="flex flex-wrap justify-around gap-6">
          <div className="flex flex-col items-center">
            <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
              {renderValue(data.course)}
            </p>
            <h1 className="whitespace-pre-wrap text-2xl">Course</h1>
          </div>

          <div className="flex flex-col items-center">
            <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
              {renderValue(data.category)}
            </p>
            <h1 className="whitespace-pre-wrap text-2xl">Categories</h1>
          </div>

          <div className="flex flex-col items-center">
            <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
              {renderValue(data.contact_us)}
            </p>
            <h1 className="whitespace-pre-wrap text-2xl">New Contact Us</h1>
          </div>

          <div className="flex flex-col items-center">
            <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
              {renderValue(data.apply_now)}
            </p>
            <h1 className="whitespace-pre-wrap text-2xl">New Apply Now Application</h1>
          </div>
        </div>
      ) : null}
      <br/>
      <hr/>
    </div>
  );
}
