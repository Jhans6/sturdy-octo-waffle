import React, { Component } from "react";
import Product from "../Product/Product";
import axios from "axios";
import "./Dashboard.css";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// products: this.props.productList,
			placeholder: "",
		};
		this.deleteProduct = this.deleteProduct.bind(this);
	}

	deleteProduct(id) {
		axios
			.delete(`/api/products/${id}`)
			.then((res) => this.props.component())
			.catch(console.log);
	}

	render() {
		const { productList, toggleEdit, edit } = this.props;

		let products = productList.map((cur, ind) => {
			return (
				<div key={cur.id} className="product-container">
					{" "}
					<img
						className="image"
						src={
							cur.image_url ||
							"http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder2.png"
						}
					/>
					<h5 className="product-name">{cur.product_name}</h5> <br />{" "}
					<p className="price">${cur.price}</p>
					<button
						className="edit"
						onClick={() => {
							toggleEdit(cur), edit(cur);
						}}
					>
						Edit
					</button>{" "}
					<button
						className="deleteBtn"
						onClick={() => this.deleteProduct(cur.id)}
					>
						Delete
					</button>{" "}
				</div>
			);
		});
		return (
			<div>
				<Product products={products} edit={edit} />
			</div>
		);
	}
}
