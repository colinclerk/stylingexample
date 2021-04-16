export const ClerkField = ({ type, label, state }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type || "text"}
        value={state.value}
        onChange={(e) => state.setValue(e.target.value)}
        placeholder={label}
      />
      {state.error && <span>{state.error}</span>}
    </div>
  );
};
