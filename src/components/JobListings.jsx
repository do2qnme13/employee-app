/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Spinner from "./Spinner";
const JobListings = ({ isHome = true }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchJobs() {
    try {
      const response = await fetch("http://localhost:8000/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const filterJobs = isHome ? jobs.slice(0, 3) : jobs;

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading && <h2>Loading....</h2>}
          {filterJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              type={job.type}
              title={job.title}
              description={job.description}
              salary={job.salary}
              location={job.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
