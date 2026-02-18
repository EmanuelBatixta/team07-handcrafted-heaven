'use client';

import { useActionState } from 'react';
import { CreateProduct } from '../app/lib/products';

export default function ProductForm() {
  const [state, formAction] = useActionState(CreateProduct, { message: '' });

  return (
    <form action={formAction} className="space-y-4">

      <div>
        <label>Name</label>
        <input name="name" type="text" required />
      </div>

      <div>
        <label>Price</label>
        <input name="price" type="number" step="0.01" required />
      </div>

      <div>
        <label>Category</label>
        <input name="category" type="text" required />
      </div>

      <div>
        <label>Description</label>
        <textarea name="description" required />
      </div>

      <div>
        <label>Image URL</label>
        <input name="image_link" type="url" required />
      </div>

      <button type="submit">Create Product</button>

      {state?.message && <p>{state.message}</p>}
    </form>
  );
}