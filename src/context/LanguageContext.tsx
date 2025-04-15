
import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageType = "es" | "en";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Common
    "app.name": "FinanceFlow",
    "logout": "Logout",
    
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.expenses": "Expenses",
    "nav.income": "Income",
    "nav.accounts": "Accounts",
    "nav.debts": "Debts",
    "nav.statistics": "Statistics",
    "nav.settings": "Settings",
    
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.spending": "Spending by Category",
    "dashboard.recent": "Recent Transactions",
    "dashboard.balance": "Current Balance",
    "dashboard.monthly": "Monthly Balance",
    "dashboard.overview": "Overview",
    "dashboard.analytics": "Analytics",
    "dashboard.monthlySpendingTrend": "Monthly Spending Trend",
    "dashboard.savingsRate": "Savings Rate",
    "dashboard.budgetStatus": "Budget Status",
    "dashboard.spendingCategories": "Spending Categories",
    "dashboard.monthlyIncome": "Monthly Income",
    "dashboard.monthlyExpenses": "Monthly Expenses",
    
    // Monthly Balance Alerts
    "alerts.overspending": "Warning: You're spending more than your income this month. Consider reducing expenses or increasing income.",
    "alerts.lowSavings": "Notice: Your savings this month are less than 10% of your income.",
    "alerts.goodSavings": "Great job! You're saving more than 20% of your income this month.",
    
    // Settings
    "settings.title": "Settings",
    "settings.appearance": "Appearance",
    "settings.appearance.desc": "Customize how FinanceFlow looks on your device.",
    "settings.darkMode": "Dark Mode",
    "settings.notifications": "Notifications",
    "settings.notifications.desc": "Configure how you want to receive notifications.",
    "settings.expenseAlerts": "Expense Alerts",
    "settings.balanceAlerts": "Low Balance Alerts",
    "settings.dataManagement": "Data Management",
    "settings.dataManagement.desc": "Manage your financial data.",
    "settings.exportData": "Export Data",
    "settings.importData": "Import Data",
    "settings.dangerZone": "Danger Zone",
    "settings.dangerZone.desc": "Be careful with these actions, they cannot be undone.",
    "settings.resetData": "Reset All Data",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language.",
    "settings.language.english": "English",
    "settings.language.spanish": "Spanish",
  },
  es: {
    // Common
    "app.name": "FinanceFlow",
    "logout": "Cerrar sesión",
    
    // Navigation
    "nav.dashboard": "Panel principal",
    "nav.expenses": "Gastos",
    "nav.income": "Ingresos",
    "nav.accounts": "Cuentas",
    "nav.debts": "Deudas",
    "nav.statistics": "Estadísticas",
    "nav.settings": "Configuración",
    
    // Dashboard
    "dashboard.title": "Panel principal",
    "dashboard.spending": "Gastos por categoría",
    "dashboard.recent": "Transacciones recientes",
    "dashboard.balance": "Balance actual",
    "dashboard.monthly": "Balance mensual",
    "dashboard.overview": "Resumen",
    "dashboard.analytics": "Análisis",
    "dashboard.monthlySpendingTrend": "Tendencia de gastos mensuales",
    "dashboard.savingsRate": "Tasa de ahorro",
    "dashboard.budgetStatus": "Estado del presupuesto",
    "dashboard.spendingCategories": "Categorías de gastos",
    "dashboard.monthlyIncome": "Ingresos mensuales",
    "dashboard.monthlyExpenses": "Gastos mensuales",
    
    // Monthly Balance Alerts
    "alerts.overspending": "Advertencia: Estás gastando más que tus ingresos este mes. Considera reducir gastos o aumentar ingresos.",
    "alerts.lowSavings": "Aviso: Tus ahorros este mes son menos del 10% de tus ingresos.",
    "alerts.goodSavings": "¡Buen trabajo! Estás ahorrando más del 20% de tus ingresos este mes.",
    
    // Settings
    "settings.title": "Configuración",
    "settings.appearance": "Apariencia",
    "settings.appearance.desc": "Personaliza cómo se ve FinanceFlow en tu dispositivo.",
    "settings.darkMode": "Modo oscuro",
    "settings.notifications": "Notificaciones",
    "settings.notifications.desc": "Configura cómo quieres recibir notificaciones.",
    "settings.expenseAlerts": "Alertas de gastos",
    "settings.balanceAlerts": "Alertas de saldo bajo",
    "settings.dataManagement": "Gestión de datos",
    "settings.dataManagement.desc": "Administra tus datos financieros.",
    "settings.exportData": "Exportar datos",
    "settings.importData": "Importar datos",
    "settings.dangerZone": "Zona de peligro",
    "settings.dangerZone.desc": "Ten cuidado con estas acciones, no se pueden deshacer.",
    "settings.resetData": "Restablecer todos los datos",
    "settings.language": "Idioma",
    "settings.language.desc": "Elige tu idioma preferido.",
    "settings.language.english": "Inglés",
    "settings.language.spanish": "Español",
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as LanguageType) || "es"; // Default to Spanish
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
