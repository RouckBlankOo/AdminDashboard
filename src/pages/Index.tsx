import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../components/Dashboard";
import { PropertiesPage } from "../components/PropertiesPage";
import { SettingsPage } from "../components/SettingsPage";
import { PropertyForm } from "../components/PropertyForm";
import { Menu, Bell, User } from "lucide-react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Villa sur Hollywood Boulevard",
      location: "Hatteras Lane, Hollywood, FL 33019, USA",
      price: "740000",
      type: "Villa",
      status: "À Vendre",
      beds: 3,
      baths: 4,
      sqft: 4530,
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
      dateAdded: "2024-06-13",
      featured: true,
      description: "Magnifique villa moderne avec vue panoramique",
      tags: ["À Vendre", "En Vedette", "Tendance"],
      isRental: false,
    },
    {
      id: 2,
      title: "Restaurant de Cuisine Traditionnelle",
      location: "Sunset Drive, Miami, FL, USA",
      price: "2600",
      type: "Commerce",
      status: "À Louer",
      sqft: 950,
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      dateAdded: "2024-06-12",
      featured: false,
      description: "Espace commercial idéal pour restaurant",
      tags: ["À Louer"],
      isRental: true,
    },
  ]);

  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  console.log("Current page:", currentPage);
  console.log("Properties count:", properties.length);

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Tableau de Bord";
      case "properties":
        return "Gestion des Propriétés";
      case "settings":
        return "Paramètres";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col w-full min-w-0">
        <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40 flex-shrink-0 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 w-full">
              {/* Left side - Mobile menu button and title */}
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-200"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-6 w-6" />
                </button>

                <div className="flex flex-col min-w-0 flex-1">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent lg:hidden truncate">
                    Say Allo Admin
                  </h1>
                  <span className="hidden lg:block text-2xl font-bold text-gray-900 truncate">
                    {getPageTitle()}
                  </span>
                  <span className="lg:hidden text-sm text-gray-600 truncate">
                    {getPageTitle()}
                  </span>
                </div>
              </div>

              {/* Right side - User menu and notifications */}
              <div className="flex items-center space-x-4 flex-shrink-0">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* User profile */}
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">Administrateur</p>
                  </div>
                  <button
                    onClick={() => setCurrentPage("settings")}
                    className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md"
                  >
                    <User className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto w-full">
          <div className="h-full w-full">
            {showPropertyForm && (
              <PropertyForm
                properties={properties}
                setProperties={setProperties}
                showPropertyForm={showPropertyForm}
                setShowPropertyForm={setShowPropertyForm}
                editingProperty={editingProperty}
                setEditingProperty={setEditingProperty}
              />
            )}

            {currentPage === "dashboard" && (
              <Dashboard properties={properties} />
            )}
            {currentPage === "properties" && (
              <PropertiesPage
                properties={properties}
                setProperties={setProperties}
                setShowPropertyForm={setShowPropertyForm}
                setEditingProperty={setEditingProperty}
              />
            )}
            {currentPage === "settings" && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
