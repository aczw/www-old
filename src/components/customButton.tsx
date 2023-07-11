const CustomButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-fit rounded-[25px] bg-otherworld-200 px-4 py-2 text-xl font-bold text-otherworld-600 transition-all hover:rounded-xl hover:bg-dash-100 hover:text-dash-600 lg:text-2xl"
      role="button"
    >
      {children}
    </div>
  );
};

export default CustomButton;
