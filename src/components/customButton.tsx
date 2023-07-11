const CustomButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-fit rounded-[30px] bg-otherworld-200 px-4 py-2 transition-all hover:rounded-xl hover:bg-dash-100"
      role="button"
    >
      {children}
    </div>
  );
};

export default CustomButton;
