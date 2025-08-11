import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import UserManagement from "@/components/UserManagement";
import Notifications from "@/components/Notifications";
import Evaluations from "@/components/Evaluations";
import Entertainment from "@/components/Entertainment";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setCurrentSection} />;
      case 'users':
        return <UserManagement />;
      case 'notifications':
        return <Notifications />;
      case 'evaluations':
        return <Evaluations />;
      case 'entertainment':
        return <Entertainment />;
      default:
        return <Dashboard onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </Layout>
  );
};

export default Index;
