import React, { Component } from "react";
import axios from "axios";
import "./Form.css";

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: "",
			placeholder:
				"http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder2.png",
			productName: "",
			price: "",
			currentId: null,
			currentProp: "",
		};
		this.clearForm = this.clearForm.bind(this);
		this.addImageUrl = this.addImageUrl.bind(this);
		this.addProductName = this.addProductName.bind(this);
		this.addPrice = this.addPrice.bind(this);
		this.checkEdit = this.checkEdit.bind(this);
	}

	componentDidUpdate(obj) {
		if (obj === this.props.current) {
			this.checkEdit();
		}
	}

	checkEdit() {
		this.setState({
			imageUrl: this.props.current.image_url,
			productName: this.props.current.product_name,
			price: this.props.current.price,
		});
	}

	editProduct(img, name, price, id) {
		axios
			.put(`/api/products/${id}`, { img, name, price })
			.then((res) => this.props.component())
			.catch(console.log());
	}

	addImageUrl(val) {
		this.setState({ imageUrl: val });
	}

	addProductName(val) {
		this.setState({ productName: val });
	}

	addPrice(val) {
		if (val < 1000000000000000 && val > 0) {
			this.setState({ price: val });
		}
	}

	addProduct(imgurl, productname, price) {
		this.setState({ imageUrl: this.state.imageInput });
		axios
			.post("/api/products", { imgurl, productname, price })
			.then((res) => {
				this.props.component(), this.clearForm();
			})
			.catch((err) => console.log(err));
	}

	clearForm() {
		this.setState({
			imageUrl: "",
			placeholder:
				"http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder2.png",
			productName: "",
			price: "",
		});
	}

	render() {
		const { imageUrl, placeholder, productName, price } = this.state;

		if (imageUrl === "") {
			var image = placeholder;
		} else {
			var image = imageUrl;
		}

		return (
			<div className="box">
				<div className="container">
					<img className="img-placeholder" src={image} />
					<h4>Image URL:</h4>
					<input
						value={imageUrl}
						onChange={(e) => this.addImageUrl(e.target.value)}
					/>
					<h4>Product Name:</h4>
					<input
						value={productName}
						onChange={(e) => this.addProductName(e.target.value)}
					/>
					<h4>Price:</h4>
					<input
						value={price}
						onChange={(e) => this.addPrice(e.target.value)}
					/>
					<br />
					<button className="cancel" onClick={() => this.clearForm()}>
						Cancel
					</button>
					<button
						className="add"
						onClick={() => {
							this.addProduct(imageUrl, productName, price), this.clearForm();
						}}
					>
						Add to inventory
					</button>
				</div>
			</div>
		);
	}
}
