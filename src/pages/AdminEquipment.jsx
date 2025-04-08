import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import { Filter, Search, Plus, Star, Edit, Trash, Eye } from "lucide-react";

const mockEquipment = [
  {
    id: 1,
    name: "Wheelchair",
    category: "Mobility",
    city: "Casablanca",
    image: "https://via.placeholder.com/300",
    rating: 4.5,
    price: 10,
    status: "Available",
  },
  {
    id: 2,
    name: "Oxygen Tank",
    category: "Respiratory",
    city: "Rabat",
    image: "https://via.placeholder.com/300",
    rating: 4.0,
    price: 15,
    status: "Rented",
  },
  {
    id: 3,
    name: "Hospital Bed",
    category: "Beds",
    city: "Fes",
    image: "https://via.placeholder.com/300",
    rating: 4.2,
    price: 20,
    status: "Maintenance",
  },
];

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEquipment, setFilteredEquipment] = useState(mockEquipment);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, activeFilter);
  };

  const handleFilterChange = (filter) => {
    const newFilter = filter === activeFilter ? null : filter;
    setActiveFilter(newFilter);
    applyFilters(searchTerm, newFilter);
  };

  const applyFilters = (term, filter) => {
    let results = mockEquipment;
    if (term.trim() !== "") {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.category.toLowerCase().includes(term.toLowerCase()) ||
          item.city.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filter) {
      results = results.filter((item) => item.status === filter);
    }
    setFilteredEquipment(results);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0d4071]">Equipment Management</h1>
            <p className="text-[#0070cc]">Manage all equipment on the platform</p>
          </div>
          <button className="bg-[#108de4] hover:bg-[#0070cc] text-white px-4 py-2 rounded inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search equipment..."
              className="pl-8 pr-4 py-2 border rounded bg-white w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["Available", "Rented", "Maintenance"].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-3 py-1 rounded text-sm border ${
                  activeFilter === status
                    ? `text-white ${
                        status === "Available"
                          ? "bg-green-500 hover:bg-green-600"
                          : status === "Rented"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Cards */}
        <div className="bg-white border rounded shadow">
          <div className="border-b px-4 py-3 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold">Equipment</h2>
            <span className="text-sm text-gray-500">
              Total: {filteredEquipment.length} items
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEquipment.map((item) => (
              <div key={item.id} className="border rounded shadow-sm overflow-hidden bg-white">
                <div className="relative h-48 bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Rented"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="text-sm text-gray-500">
                    {item.category} • {item.city}
                  </div>
                  <div className="flex items-center mt-2">
                    {renderStars(item.rating)}
                    <span className="ml-2 text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[#0070cc] font-bold">${item.price}/day</span>
                    <div className="space-x-1">
                      <button className="h-8 w-8 hover:bg-gray-100 rounded">
                        <Eye className="h-4 w-4 mx-auto" />
                      </button>
                      <button className="h-8 w-8 hover:bg-gray-100 rounded">
                        <Edit className="h-4 w-4 mx-auto" />
                      </button>
                      <button className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 rounded">
                        <Trash className="h-4 w-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredEquipment.length === 0 && (
              <div className="col-span-3 py-8 text-center text-gray-500">
                No equipment found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Equipment;
