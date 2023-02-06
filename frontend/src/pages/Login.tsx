import { ChangeEvent, FormEvent, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

type FormData = {
	email: string;
	password: string;
};

function Login() {
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData(state => ({
			...state,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt />
					Login
				</h1>
				<p>Please login to get support</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={formData.email}
							onChange={onChange}
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={formData.password}
							onChange={onChange}
							placeholder='Enter your password'
							required
						/>
					</div>

					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export { Login };
