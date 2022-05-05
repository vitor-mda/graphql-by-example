import JobList from './JobList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompanyById } from '../graphql/queries';

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompanyById(companyId).then(setCompany)
  }, [companyId]);

  if (!company) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className="title is-5">
          Jobs at {company.name}
      </h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
