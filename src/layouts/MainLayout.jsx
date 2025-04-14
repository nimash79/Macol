const MainLayout = ({ children, splash = false }) => {
  return (
    <div className="app-container">
      <div className="main-layout" style={splash ? { padding: 0 } : {}}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
