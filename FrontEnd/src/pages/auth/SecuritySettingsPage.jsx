import { useState, useRef } from "react";
import { changePassword, updateAvatar } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

const DEVICES = [
  {
    id: 1,
    icon: "laptop_mac",
    name: 'MacBook Pro 16"',
    location: "San Francisco, USA • Chrome v121.0",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: 2,
    icon: "smartphone",
    name: "iPhone 15 Pro",
    location: "San Francisco, USA • EduFlow App v2.4",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: 3,
    icon: "desktop_windows",
    name: "Windows Workstation",
    location: "New York, USA • Firefox v115.0",
    lastActive: "Last active yesterday",
    isCurrent: false,
  },
];

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", active: false },
  { icon: "school", label: "My Courses", active: false },
  { icon: "favorite", label: "Wishlist", active: false },
  { icon: "settings", label: "Settings", active: true, filled: true },
  { icon: "help", label: "Help Center", active: false },
];

export default function SecuritySettingsPage() {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("Password updated successfully!");
  const [devices, setDevices] = useState(DEVICES);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [savingPw, setSavingPw] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(
    user?.avatarUrl ||
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0JfhenafA3RbiAJW4KW62n9T04LZjgMeGHSP-9cBAehMfUATfT8lI5-7odsnbnqDaxrwPDZhuiShf8ofcWmTtifVEb8Y3rXOvXKmQLczKUepwmjY0R2o3MxrcDX3-_sHoeYLrKjselIxNv7vCdT9itgB7PNorHq8BLi1HY0FCMASqgym7cV0Rrgm2UyVUWkLi63-MSBMZmSXn7JEjsJR_A2uj0_SnlpxqgbBj9VVjkXnWiqAQXtlBwUAz0tDp4JEPzsUUxwc8x4Y",
  );

  function showToast(msg = "Password updated successfully!") {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPwError("Passwords do not match");
      return;
    }
    setPwError("");
    setSavingPw(true);
    try {
      await changePassword(currentPassword, newPassword);
      showToast("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPwError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setSavingPw(false);
    }
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatarSrc(preview);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { data } = await updateAvatar(formData);
      if (data.avatarUrl) setAvatarSrc(data.avatarUrl);
      showToast("Avatar updated!");
    } catch {
      showToast("Failed to upload avatar.");
    }
  }

  function removeDevice(id) {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  }

  function logoutAllDevices() {
    setDevices((prev) => prev.filter((d) => d.isCurrent));
  }

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 h-16 shadow-sm">
        <div className="flex justify-between items-center w-full px-margin-desktop h-full max-w-container-max mx-auto">
          <div className="flex items-center gap-stack-lg">
            <span className="font-display text-headline-md font-bold text-primary">
              EduFlow
            </span>
            <nav className="hidden md:flex items-center gap-gutter">
              {["Browse", "Mentors", "Pricing"].map((item) => (
                <a
                  key={item}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-stack-md">
            <div className="hidden lg:flex relative mr-stack-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-sm w-64 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Search courses..."
                type="text"
              />
            </div>
            <button className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              notifications
            </button>
            <button className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              shopping_cart
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBROHNgAaewuwfSwaF1LWad87j9_fohEKZ1wxCC2tmAkuyWeGBvoccJXsjt1s6PNZJawz-2Mtm0mkdSk30d7LmFcgtOjFgfu-YF5vr0YmAqAKR90tKkIQEU1-dvXCBPutwdufEW-VuHoyaN0sRGFOA9UMkMMdOkn6Qf1AB56juthRW4qBWPHqj_zrCnPpccmj38_AeQsuS0z4Us16upsnxtIeGqiwE8Kb-9o0K6rVLV4O-RwNXqFKB8PVlIkf1JaEwS4SgHiEYgvLg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface flex flex-col py-stack-lg border-r border-outline-variant/20">
          <div className="px-stack-lg mb-stack-lg">
            <div className="flex items-center gap-stack-md">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_circle
                </span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface">
                  Alex Johnson
                </p>
                <p className="text-xs text-on-surface-variant">
                  Premium Learner
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-stack-sm">
            {NAV_ITEMS.map(({ icon, label, active, filled }) => (
              <a
                key={label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-primary-container/20 text-primary border-l-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1"
                }`}
                href="#"
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    filled ? { fontVariationSettings: "'FILL' 1" } : undefined
                  }
                >
                  {icon}
                </span>
                <span
                  className={`font-label-md text-label-md ${active ? "font-bold" : ""}`}
                >
                  {label}
                </span>
              </a>
            ))}
          </nav>

          <div className="px-stack-sm mt-auto">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-container/20 transition-all">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md text-label-md">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-margin-desktop bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="mb-stack-lg">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Security Settings
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Manage your account security and authentication methods.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Avatar Card */}
              <section className="lg:col-span-5 glass-card rounded-xl p-stack-lg shadow-sm flex flex-col items-center justify-center text-center">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      src={avatarSrc}
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-3xl">
                      photo_camera
                    </span>
                  </div>
                </div>
                <h3 className="mt-stack-md font-headline-md text-headline-md text-on-surface">
                  Profile Photo
                </h3>
                <p className="font-body-sm text-on-surface-variant mt-2 mb-stack-md">
                  Upload a new photo to personalize your profile across the
                  platform.
                </p>
                <button
                  className="bg-primary text-white font-label-md text-label-md py-2 px-stack-lg rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Update Avatar
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </section>

              {/* Change Password */}
              <section className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
                <div className="flex items-center gap-3 mb-stack-md">
                  <span className="material-symbols-outlined text-primary">
                    lock_reset
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Change Password
                  </h3>
                </div>
                <form
                  className="space-y-stack-md"
                  onSubmit={handlePasswordSubmit}
                >
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant block mb-2">
                      Current Password
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-2">
                        New Password
                      </label>
                      <input
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-2">
                        Confirm New Password
                      </label>
                      <input
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2 flex-col items-end gap-2">
                    {pwError && (
                      <p className="text-red-400 text-sm">{pwError}</p>
                    )}
                    <button
                      className="bg-primary text-white font-label-md text-label-md py-2.5 px-stack-lg rounded-lg hover:bg-primary-container transition-all"
                      type="submit"
                      disabled={savingPw}
                    >
                      {savingPw ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </section>

              {/* 2FA */}
              <section className="lg:col-span-12 bg-surface-container-low border border-outline-variant/50 rounded-xl p-stack-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified_user
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">
                        Two-Factor Authentication (2FA)
                      </h3>
                      <p className="font-body-sm text-on-surface-variant mt-1">
                        Enhance your account security by requiring an extra
                        verification step during sign-in.
                      </p>
                    </div>
                  </div>
                  <button className="px-6 py-2 border-2 border-primary text-primary font-label-md text-label-md rounded-full hover:bg-primary/5 transition-all">
                    Configure 2FA
                  </button>
                </div>
              </section>

              {/* Session Management */}
              <section className="lg:col-span-12 bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
                <div className="p-stack-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      devices
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Logged-in Devices
                    </h3>
                  </div>
                  <button
                    className="text-error font-label-md text-label-md hover:underline decoration-error/30 underline-offset-4"
                    onClick={logoutAllDevices}
                  >
                    Logout of all devices
                  </button>
                </div>

                <div className="divide-y divide-outline-variant">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="p-stack-lg flex items-center justify-between group hover:bg-surface-container-low transition-colors"
                    >
                      <div className="flex items-center gap-stack-lg">
                        <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined">
                            {device.icon}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-label-md text-label-md text-on-surface">
                              {device.name}
                            </p>
                            {device.isCurrent && (
                              <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] rounded-full font-bold uppercase tracking-wider">
                                Current Device
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant mt-1">
                            {device.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-outline font-medium">
                          {device.lastActive}
                        </span>
                        {!device.isCurrent && (
                          <button
                            className="material-symbols-outlined text-outline-variant hover:text-error transition-colors"
                            onClick={() => removeDevice(device.id)}
                          >
                            logout
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant text-center">
              <p className="font-body-sm text-on-surface-variant">
                Not recognizing a device or noticed suspicious activity?
              </p>
              <a
                className="inline-flex items-center gap-1 text-primary font-label-md text-label-md mt-2 hover:underline"
                href="#"
              >
                Contact Security Support{" "}
                <span className="material-symbols-outlined text-sm">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed top-20 right-8 glass-card border-l-4 border-primary p-4 rounded-lg shadow-xl flex items-center gap-3 transition-transform duration-500 ${
          toastVisible ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"
        }`}
      >
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <div>
          <p className="font-label-md text-label-md text-on-surface">Success</p>
          <p className="text-xs text-on-surface-variant">{toastMsg}</p>
        </div>
        <button
          className="material-symbols-outlined text-outline-variant hover:text-on-surface"
          onClick={() => setToastVisible(false)}
        >
          close
        </button>
      </div>
    </div>
  );
}
