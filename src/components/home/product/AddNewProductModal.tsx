import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

/*

export interface ProductTypes {
  id: string;
  name: string;
  description: string;
  price: string;
  picture: string;
}


*/

const AddNewProductModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-5">
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <div className="w-full max-w-md">
            <form>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Product Details</FieldLegend>
                  <FieldDescription>
                    Provide the necessary information about the product you want
                    to add.
                  </FieldDescription>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="product-name">
                        Product Name
                      </FieldLabel>
                      <Input
                        id="product-name"
                        placeholder="Enter product name"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="product-description">
                        Product Description
                      </FieldLabel>
                      <Textarea
                        id="product-description"
                        placeholder="Enter product description"
                        className="resize-none"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="product-price">
                        Product Price
                      </FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="product-price">
                          <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="200">200</SelectItem>
                            <SelectItem value="300">300</SelectItem>
                            <SelectItem value="400">400</SelectItem>
                            <SelectItem value="500">500</SelectItem>
                            <SelectItem value="600">600</SelectItem>
                            <SelectItem value="700">700</SelectItem>
                            <SelectItem value="800">800</SelectItem>
                            <SelectItem value="900">900</SelectItem>
                            <SelectItem value="1000">1000</SelectItem>
                            <SelectItem value="1100">1100</SelectItem>
                            <SelectItem value="1200">1200</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="product-picture-url">
                        Product Picture URL
                      </FieldLabel>
                      <Input
                        id="product-picture-url"
                        placeholder="Enter product picture URL"
                        required
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <Field orientation="horizontal">
                  <Button type="submit">Submit</Button>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProductModal;
