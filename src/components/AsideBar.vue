<!-- AsideBar.vue -->
<template>
  <nav class="sidebar">
    <div class="sidebar-top-wrapper">
      <div class="sidebar-top">
        <router-link to="/" class="logo__wrapper">
          <!-- <img src="assets/astra.svg" alt="Logo" class="logo-small" /> -->
          <span class="hide">Astra</span>
        </router-link>
      </div>
      <div class="expand-btn">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div class="search__wrapper">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 9L13 13M5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333Z"
          stroke="#697089"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input type="search" placeholder="Search for anything..." />
    </div>
    <div class="sidebar-links">
      <h2>Main</h2>
      <ul>
        <li>
          <router-link to="/dashboard" title="Dashboard" class="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-layout-dashboard"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4h6v8h-6z" />
              <path d="M4 16h6v4h-6z" />
              <path d="M14 12h6v8h-6z" />
              <path d="M14 4h6v4h-6z" />
            </svg>
            <span class="link hide">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/payments" title="Payments" class="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-transform-filled"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M18 14a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z"
                stroke-width="0"
                fill="currentColor"
              />
              <path
                d="M16.707 2.293a1 1 0 0 1 .083 1.32l-.083 .094l-1.293 1.293h3.586a3 3 0 0 1 2.995 2.824l.005 .176v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-3a1 1 0 0 0 -.883 -.993l-.117 -.007h-3.585l1.292 1.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-3 -3a.98 .98 0 0 1 -.28 -.872l.036 -.146l.04 -.104c.058 -.126 .14 -.24 .245 -.334l2.959 -2.958a1 1 0 0 1 1.414 0z"
                stroke-width="0"
                fill="currentColor"
              />
              <path
                d="M3 12a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 0 .883 .993l.117 .007h3.585l-1.292 -1.293a1 1 0 0 1 -.083 -1.32l.083 -.094a1 1 0 0 1 1.32 -.083l.094 .083l3 3a.98 .98 0 0 1 .28 .872l-.036 .146l-.04 .104a1.02 1.02 0 0 1 -.245 .334l-2.959 2.958a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.291 -1.293h-3.584a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-3a1 1 0 0 1 1 -1z"
                stroke-width="0"
                fill="currentColor"
              />
              <path
                d="M6 2a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z"
                stroke-width="0"
                fill="currentColor"
              />
            </svg>
            <span class="link hide">Payments</span>
          </router-link>
        </li>
        <!-- Добавьте другие элементы меню здесь -->
      </ul>
    </div>
    <div class="sidebar-links bottom-links">
      <h2>Settings</h2>
      <ul>
        <li>
          <router-link to="/settings" title="Settings" class="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -.2"
                stroke-width="0"
                fill="currentColor"
              />
            </svg>
            <span class="link hide">Settings</span>
          </router-link>
        </li>
        <li>
          <router-link to="/logout" title="Logout" class="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 12v.01"></path>
              <path
                d="M3 9v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4 -4v-6a4 4 0 0 0 -4 -4h-4a4 4 0 0 0 -4 4z"
              ></path>
              <path d="M16 10h6m-3 -3v6"></path>
            </svg>
            <span class="link hide">Logout</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  min-height: 53.75rem;
  height: 100%;
  padding: 1rem 0px;
  border-radius: 1rem;
  max-width: 18rem;
  display: flex;
  color: var(--white);
  flex-direction: column;
  background: var(--sidebar-background);
  transition: max-width 0.1s ease-in-out;
}

body.collapsed .sidebar {
  max-width: 5rem;
  display: flex;
  align-items: center;
}

body.collapsed .hide {
  position: absolute;
  display: none;
}

/*? search wrapper */
.search__wrapper {
  padding: 0 1rem;
  position: relative;
}

.search__wrapper input {
  background: var(--background);
  height: 2.5rem;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  padding-left: 2rem;
  flex-grow: 1;
  outline: none;
  border: none;
}

.search__wrapper svg {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 1.625rem;
  transform: translateY(-50%);
  pointer-events: none;
  right: 1.5rem;
}

body.collapsed .search__wrapper svg {
  top: 50%;
  left: 50%;
  right: auto;
  transform: translate(-50%, -50%);
  stroke: var(--sidebar-primary-hover);
}

.search__wrapper input::-webkit-input-placeholder {
  color: var(--sidebar-primary-hover);
  white-space: nowrap;
}

body.collapsed .search__wrapper input {
  max-width: 2.5rem;
}

body.collapsed .search__wrapper input::-webkit-input-placeholder {
  color: transparent;
}

/*? sidebar top */

.sidebar-top-wrapper {
  display: flex;
}

.sidebar-top {
  position: relative;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  height: 4rem;
  padding-bottom: 1rem;
}

body.collapsed .sidebar-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo__wrapper {
  margin-top: -0.25rem;
  display: flex;
  align-items: center;
  color: var(--text-link);
  font-weight: 700;
  text-decoration: none;
  font-size: 1.35rem;
  gap: 0.5rem;
  padding: 0 1rem;
}

.logo-small {
  height: 48px;
  width: 48px;
  overflow: hidden;
  object-fit: cover;
}

/*? menu links */
.sidebar-links {
  margin-top: 1rem;
  width: 100%;
}

.sidebar-links h2 {
  margin-left: 1rem;
  color: var(--headline);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.125rem;
  margin-bottom: 0.5rem;
  animation: fadeIn 0.2s ease-in-out;
}

body.collapsed h2 {
  display: none;
}

.sidebar-links ul {
  list-style-type: none;
  position: relative;
  display: flex;
  column-gap: 0.5rem;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.sidebar-links li {
  color: var(--text-link);
}

body.collapsed .sidebar-links li {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-links li svg {
  stroke: var(--text-link);
  width: 1;
  height: 1.75rem;
  min-width: 1.75rem;
}

.sidebar-links li a:hover {
  background: var(--sidebar-primary-hover);
}

.sidebar-links li a {
  color: var(--text-link);
  flex-grow: 1;
  padding: 0 1rem;
  font-size: 1.25rem;
  display: flex;
  gap: 1.75rem;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  text-decoration: none;
  transition: background 0.2s ease-in-out;
}

.sidebar-links li a .link {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  animation: fadeIn 0.2s ease-in-out;
}

.sidebar-links li a img {
  height: 2.125rem;
  width: 2.125rem;
}

.sidebar-links .active:hover {
  background: var(--sidebar-primary-hover);
}

.sidebar-links .active {
  text-decoration: none;
  background: var(--sidebar-primary-hover);
  color: var(--text-link);
}

.sidebar-links .active svg {
  stroke: var(--text-link);
}

/* ?tooltip */
.tooltip {
  position: relative;
}

.tooltip .tooltip__content {
  visibility: hidden;
  background: var(--primary-color);
  color: var(--white);
  text-align: center;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  position: absolute;
  z-index: 1;
  left: 5.625rem;
}

.collapsed .tooltip:hover .tooltip__content {
  visibility: visible;
}

/*? profile part */
.sidebar__profile {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-direction: row;
  padding: 0 1rem;
  color: var(--text-link);
  overflow-x: hidden;
  min-height: 2.6125rem;
}

.avatar__wrapper {
  position: relative;
  display: flex;
}

.avatar {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
}

.avatar__name {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  white-space: nowrap;
  animation: fadeIn 0.2s ease-in-out;
}

.user-name {
  font-weight: 600;
  text-align: left;
  color: var(--text-link);
  animation: fadeIn 0.2s ease-in-out;
}

.email {
  color: var(--text-link);
  font-size: 0.8125rem;
  animation: fadeIn 0.2s ease-in-out;
}

.logout {
  animation: fadeIn 0.2s ease-in-out;
  margin-left: auto;
}

.logout svg {
  color: var(--logout);
}

body.collapsed .logout {
  display: none;
}

/*? Expand button */

.expand-btn {
  position: absolute;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: var(--expand-button);
  z-index: 2;
  right: -1.125rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.expand-btn svg {
  transform: rotate(-180deg);
  stroke: var(--white);
  width: 1.25rem;
  height: 1.25rem;
}

body.collapsed .expand-btn svg {
  transform: rotate(-360deg);
}

.bottom-links {
  margin-top: auto;
}

@keyframes fadeIn {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    opacity: 1;
    width: 100%;
  }
}
</style>
