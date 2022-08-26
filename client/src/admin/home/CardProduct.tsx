import "./CardProduct.css";

export default function (props: any) {
  return (
    <div className="CardProduct">
      <h1>{props.data.name}</h1>
      <div className="containerMain">
        <div className="containerImage">
          <img src={props.data.image} alt="" />
        </div>
        <div className="containerInfo">
          <p>{props.data.description}</p>
          <h2>{props.data.price + "Dollars"}</h2>
        </div>
      </div>
    </div>
  );
}
