import { ModusWcNavbar } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

// Type definitions for navbar interfaces
interface NavbarUserCard {
  name: string;
  email: string;
  avatarSrc?: string;
}

interface NavbarVisibility {
  mainMenu?: boolean;
  search?: boolean;
  searchInput?: boolean;
  notifications?: boolean;
  apps?: boolean;
  ai?: boolean;
  help?: boolean;
  user?: boolean;
}

interface NavbarTextOverrides {
  apps?: string;
  help?: string;
  notifications?: string;
  search?: string;
}

interface ModusNavbarProps {
  // Layout
  condensed?: boolean;

  // User information (required)
  userCard: NavbarUserCard;

  // Visibility controls
  visibility?: NavbarVisibility;

  // Menu states
  mainMenuOpen?: boolean;
  notificationsMenuOpen?: boolean;
  appsMenuOpen?: boolean;
  searchInputOpen?: boolean;
  userMenuOpen?: boolean;
  condensedMenuOpen?: boolean;

  // Search configuration
  searchDebounceMs?: number;

  // Text overrides for condensed mode
  textOverrides?: NavbarTextOverrides;

  // Custom styling
  customClass?: string;

  // Slot content
  mainMenuContent?: ReactNode;
  notificationsContent?: ReactNode;
  appsContent?: ReactNode;
  startContent?: ReactNode;
  centerContent?: ReactNode;
  endContent?: ReactNode;

  // Event handlers
  onAiClick?: () => void;
  onAppsClick?: () => void;
  onHelpClick?: () => void;
  onNotificationsClick?: () => void;
  onSearchClick?: () => void;
  onSignOutClick?: () => void;
  onMyTrimbleClick?: () => void;
  onTrimbleLogoClick?: () => void;
  onSearchChange?: (value: string) => void;

  // Menu state change handlers
  onMainMenuOpenChange?: (open: boolean) => void;
  onNotificationsMenuOpenChange?: (open: boolean) => void;
  onAppsMenuOpenChange?: (open: boolean) => void;
  onSearchInputOpenChange?: (open: boolean) => void;
  onUserMenuOpenChange?: (open: boolean) => void;
  onCondensedMenuOpenChange?: (open: boolean) => void;

  // Accessibility
  ariaLabel?: string;
}

export default function ModusNavbar({
  condensed = false,
  userCard,
  visibility = {
    mainMenu: true,
    search: true,
    searchInput: true,
    notifications: true,
    apps: true,
    ai: true,
    help: true,
    user: true,
  },
  mainMenuOpen = false,
  notificationsMenuOpen = false,
  appsMenuOpen = false,
  searchInputOpen = false,
  userMenuOpen = false,
  condensedMenuOpen = false,
  searchDebounceMs = 300,
  textOverrides,
  customClass,
  mainMenuContent,
  notificationsContent,
  appsContent,
  startContent,
  centerContent,
  endContent,
  onAiClick,
  onAppsClick,
  onHelpClick,
  onNotificationsClick,
  onSearchClick,
  onSignOutClick,
  onMyTrimbleClick,
  onTrimbleLogoClick,
  onSearchChange,
  onMainMenuOpenChange,
  onNotificationsMenuOpenChange,
  onAppsMenuOpenChange,
  onSearchInputOpenChange,
  onUserMenuOpenChange,
  onCondensedMenuOpenChange,
  ariaLabel,
}: ModusNavbarProps) {
  const navbarRef = useRef<HTMLElement>(null);

  // Event handlers with useCallback for performance
  const handleAiClick = useCallback(() => {
    onAiClick?.();
  }, [onAiClick]);

  const handleAppsClick = useCallback(() => {
    onAppsClick?.();
  }, [onAppsClick]);

  const handleHelpClick = useCallback(() => {
    onHelpClick?.();
  }, [onHelpClick]);

  const handleNotificationsClick = useCallback(() => {
    onNotificationsClick?.();
  }, [onNotificationsClick]);

  const handleSearchClick = useCallback(() => {
    onSearchClick?.();
  }, [onSearchClick]);

  const handleSignOutClick = useCallback(() => {
    onSignOutClick?.();
  }, [onSignOutClick]);

  const handleMyTrimbleClick = useCallback(() => {
    onMyTrimbleClick?.();
  }, [onMyTrimbleClick]);

  const handleTrimbleLogoClick = useCallback(() => {
    onTrimbleLogoClick?.();
  }, [onTrimbleLogoClick]);

  const handleSearchChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>;
      onSearchChange?.(customEvent.detail.value);
    },
    [onSearchChange]
  );

  const handleMainMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onMainMenuOpenChange?.(customEvent.detail);
    },
    [onMainMenuOpenChange]
  );

  const handleNotificationsMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onNotificationsMenuOpenChange?.(customEvent.detail);
    },
    [onNotificationsMenuOpenChange]
  );

  const handleAppsMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onAppsMenuOpenChange?.(customEvent.detail);
    },
    [onAppsMenuOpenChange]
  );

  const handleSearchInputOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onSearchInputOpenChange?.(customEvent.detail);
    },
    [onSearchInputOpenChange]
  );

  const handleUserMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onUserMenuOpenChange?.(customEvent.detail);
    },
    [onUserMenuOpenChange]
  );

  const handleCondensedMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onCondensedMenuOpenChange?.(customEvent.detail);
    },
    [onCondensedMenuOpenChange]
  );

  // Set up event listeners when component mounts
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // Add event listeners
    navbar.addEventListener("aiClick", handleAiClick);
    navbar.addEventListener("appsClick", handleAppsClick);
    navbar.addEventListener("helpClick", handleHelpClick);
    navbar.addEventListener("notificationsClick", handleNotificationsClick);
    navbar.addEventListener("searchClick", handleSearchClick);
    navbar.addEventListener("signOutClick", handleSignOutClick);
    navbar.addEventListener("myTrimbleClick", handleMyTrimbleClick);
    navbar.addEventListener("trimbleLogoClick", handleTrimbleLogoClick);
    navbar.addEventListener("searchChange", handleSearchChange);
    navbar.addEventListener("mainMenuOpenChange", handleMainMenuOpenChange);
    navbar.addEventListener(
      "notificationsMenuOpenChange",
      handleNotificationsMenuOpenChange
    );
    navbar.addEventListener("appsMenuOpenChange", handleAppsMenuOpenChange);
    navbar.addEventListener(
      "searchInputOpenChange",
      handleSearchInputOpenChange
    );
    navbar.addEventListener("userMenuOpenChange", handleUserMenuOpenChange);
    navbar.addEventListener(
      "condensedMenuOpenChange",
      handleCondensedMenuOpenChange
    );

    // Cleanup event listeners
    return () => {
      navbar.removeEventListener("aiClick", handleAiClick);
      navbar.removeEventListener("appsClick", handleAppsClick);
      navbar.removeEventListener("helpClick", handleHelpClick);
      navbar.removeEventListener(
        "notificationsClick",
        handleNotificationsClick
      );
      navbar.removeEventListener("searchClick", handleSearchClick);
      navbar.removeEventListener("signOutClick", handleSignOutClick);
      navbar.removeEventListener("myTrimbleClick", handleMyTrimbleClick);
      navbar.removeEventListener("trimbleLogoClick", handleTrimbleLogoClick);
      navbar.removeEventListener("searchChange", handleSearchChange);
      navbar.removeEventListener(
        "mainMenuOpenChange",
        handleMainMenuOpenChange
      );
      navbar.removeEventListener(
        "notificationsMenuOpenChange",
        handleNotificationsMenuOpenChange
      );
      navbar.removeEventListener(
        "appsMenuOpenChange",
        handleAppsMenuOpenChange
      );
      navbar.removeEventListener(
        "searchInputOpenChange",
        handleSearchInputOpenChange
      );
      navbar.removeEventListener(
        "userMenuOpenChange",
        handleUserMenuOpenChange
      );
      navbar.removeEventListener(
        "condensedMenuOpenChange",
        handleCondensedMenuOpenChange
      );
    };
  }, [
    handleAiClick,
    handleAppsClick,
    handleHelpClick,
    handleNotificationsClick,
    handleSearchClick,
    handleSignOutClick,
    handleMyTrimbleClick,
    handleTrimbleLogoClick,
    handleSearchChange,
    handleMainMenuOpenChange,
    handleNotificationsMenuOpenChange,
    handleAppsMenuOpenChange,
    handleSearchInputOpenChange,
    handleUserMenuOpenChange,
    handleCondensedMenuOpenChange,
  ]);

  // Update navbar properties when props change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navbar = navbarRef.current as any;
    if (!navbar) return;

    // Update visibility
    navbar.visibility = visibility;

    // Update user card
    navbar.userCard = userCard;

    // Update text overrides
    if (textOverrides) {
      navbar.textOverrides = textOverrides;
    }

    // Update search debounce
    navbar.searchDebounceMs = searchDebounceMs;

    // Update menu states
    navbar.mainMenuOpen = mainMenuOpen;
    navbar.notificationsMenuOpen = notificationsMenuOpen;
    navbar.appsMenuOpen = appsMenuOpen;
    navbar.searchInputOpen = searchInputOpen;
    navbar.userMenuOpen = userMenuOpen;
    navbar.condensedMenuOpen = condensedMenuOpen;
  }, [
    visibility,
    userCard,
    textOverrides,
    searchDebounceMs,
    mainMenuOpen,
    notificationsMenuOpen,
    appsMenuOpen,
    searchInputOpen,
    userMenuOpen,
    condensedMenuOpen,
  ]);

  return (
    <ModusWcNavbar
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={navbarRef as any}
      condensed={condensed}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {/* Main Menu Slot */}
      {mainMenuContent && <div slot="main-menu">{mainMenuContent}</div>}

      {/* Notifications Slot */}
      {notificationsContent && (
        <div slot="notifications">{notificationsContent}</div>
      )}

      {/* Apps Slot */}
      {appsContent && <div slot="apps">{appsContent}</div>}

      {/* Start Slot */}
      {startContent && <div slot="start">{startContent}</div>}

      {/* Center Slot */}
      {centerContent && <div slot="center">{centerContent}</div>}

      {/* End Slot */}
      {endContent && <div slot="end">{endContent}</div>}
    </ModusWcNavbar>
  );
}
