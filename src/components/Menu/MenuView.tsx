function MenuView({ viewData }: any) {
  return (
    <div data-testid="view-modal" className="view">
      <div className="view__wrap">
        <div className="view__label">Name:</div>
        <div data-testid="view-fullname" className="view__value">
          {viewData?.name}
        </div>
      </div>
      <div className="view__wrap">
        <div className="view__label">Category:</div>
        <div data-testid="view-birthday" className="view__value">
          {viewData?.category?.name}
        </div>
      </div>
      <div className="view__wrap">
        <div className="view__label">Cost:</div>
        <div data-testid="view-gender" className="view__value">
          {viewData?.cost}
        </div>
      </div>
      <div className="view__wrap">
        <div className="view__label">Price:</div>
        <div data-testid="view-country" className="view__value">
          {viewData?.price}
        </div>
      </div>
      <div className="view__wrap">
        <div className="view__label">Stock:</div>
        <div data-testid="view-description" className="view__value">
          {viewData?.stock}
        </div>
      </div>
      <div className="view__wrap">
        <div className="view__label">Options:</div>
        <div data-testid="view-description" className="view__value">
          {viewData?.options?.length <= 0 ? <span>None</span> : ""}
          {viewData?.options?.map((opt: any, index: any) => {
            return viewData?.options?.length <= 0 ? (
              <span>None</span>
            ) : viewData?.options?.length - 1 === index ? (
              <span key={index}>{opt?.name}</span>
            ) : (
              <span key={index}>{opt?.name}, </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MenuView;
