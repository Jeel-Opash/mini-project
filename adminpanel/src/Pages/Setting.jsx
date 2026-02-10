import React, { useContext } from "react";
import { ThemeContext } from "../context/themecontext";

export const Setting= () => {
  const { settings, toggleSetting } = useContext(ThemeContext);

  return (
    <div className="settings-container">
      <h2>⚙️ Settings</h2>

      <div className="settings-card">
        <SettingItem label="Dark Mode" value={settings.darkMode} onChange={() => toggleSetting("darkMode")}/>

        <SettingItem label="Enable Ads" value={settings.adsEnabled}
          onChange={() => toggleSetting("adsEnabled")}/>

        <SettingItem label="Email Notifications" value={settings.emailNotifications}
          onChange={() => toggleSetting("emailNotifications")}/>

        <SettingItem label="Maintenance Mode" value={settings.maintenanceMode}
          onChange={() => toggleSetting("maintenanceMode")}/>
      </div>
    </div>
  );
};

export const SettingItem = ({ label, value, onChange }) => (
  <div className="setting-item">
    <span>{label}</span>
    <label className="switch">
      <input type="checkbox" checked={value} onChange={onChange} />
      <span className="slider"></span>
    </label>
  </div>
);
