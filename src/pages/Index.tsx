import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import UserManagement from "@/components/UserManagement";
import Notifications from "@/components/Notifications";
import Evaluations from "@/components/Evaluations";
import Entertainment from "@/components/Entertainment";
import Login from "@/components/Login";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("login");
  const [loggedUser, setLoggedUser] = useState<any>(null);
  
    useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      setLoggedUser(JSON.parse(user));
      setCurrentSection("dashboard");
    }
  }, []);

  // Función para guardar usuario en localStorage al loguear
  const handleLogin = (userData: any) => {
    localStorage.setItem("loggedUser", JSON.stringify(userData));
    setLoggedUser(userData);
    setCurrentSection("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    setCurrentSection("login");
  };

  const renderSection = () => {
    if (!loggedUser) {
      return <Login onLogin={handleLogin} />;
    }

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
      case 'login':
        return <Login />;
      default:
        // return <Dashboard onSectionChange={setCurrentSection} />;
       return <Dashboard onSectionChange={setCurrentSection} />;
    }
  };

  return (
    loggedUser ? (

      <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </Layout>
    ) : (
      <Login onLogin={handleLogin} />
    )
    
  );
};

export default Index;
