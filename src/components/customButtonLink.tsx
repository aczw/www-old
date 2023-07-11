import Link from "next/link";
import CustomButton from "./customButton";

const CustomButtonLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <CustomButton>
      <Link
        href={href}
        target="_blank"
        className="flex flex-row items-center gap-1 lg:gap-2"
      >
        {children}
      </Link>
    </CustomButton>
  );
};

export default CustomButtonLink;
