
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  RepresentativesSearch,
  RepresentativesFilters,
  RepresentativesList
} from '@/components/representatives';
import { mockRepresentatives, Representative } from '@/data/mockRepresentatives';

const Representatives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedParty, setSelectedParty] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDistrictFilter = (district: string) => {
    setSelectedDistrict(selectedDistrict === district ? '' : district);
  };

  const handlePartyFilter = (party: string) => {
    setSelectedParty(selectedParty === party ? '' : party);
  };

  const resetFilters = () => {
    setSelectedDistrict('');
    setSelectedParty('');
  };

  const filteredRepresentatives = mockRepresentatives.filter(rep => {
    const matchesSearch = rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rep.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rep.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDistrict = selectedDistrict === '' || rep.district === selectedDistrict;
    const matchesParty = selectedParty === '' || rep.party === selectedParty;
    
    return matchesSearch && matchesDistrict && matchesParty;
  });

  // Get unique districts and parties for filters
  const districts = Array.from(new Set(mockRepresentatives.map(rep => rep.district)));
  const parties = Array.from(new Set(mockRepresentatives.map(rep => rep.party)));

  return (
    <Layout>
      <div className="honor-container py-12">
        <h1 className="text-3xl font-bold mb-2">Представители власти</h1>
        <p className="text-honor-darkGray mb-8">
          Список представителей власти с информацией о их деятельности
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <RepresentativesFilters
              districts={districts}
              parties={parties}
              selectedDistrict={selectedDistrict}
              selectedParty={selectedParty}
              handleDistrictFilter={handleDistrictFilter}
              handlePartyFilter={handlePartyFilter}
              resetFilters={resetFilters}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <RepresentativesSearch
              searchTerm={searchTerm}
              handleSearch={handleSearch}
            />
            <RepresentativesList representatives={filteredRepresentatives} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Representatives;
