import UserSection from "@/components/shared/header/userSection";
import CartSection from "@/components/shared/header/cartSection";
import { DarkModeToggle } from "@/components/utility/mode-toggle";

const Menu = () => {
    return (
        <>
            <nav className="flex justify-between items-center gap-3">
                <DarkModeToggle />
                <CartSection />
                <UserSection />
            </nav>
        </>
    );
};

export default Menu;
