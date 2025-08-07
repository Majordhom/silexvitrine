/**
 * Navigation related DTOs
 */

export interface NavigationContextType {
    activeSection: string;
    setActiveSection: (section: string) => void;
    isScrolled: boolean;
    burgerMenuOpen: boolean;
    setBurgerMenuOpen: (open: boolean) => void;
}

export interface TheoBurgerMenuProps {
    isOpen: boolean;
    onToggle: () => void;
}