import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getAllCustomers } from '../services/customers.services';
import { FormAutoComplete, FormDatePicker, FormTextField } from '../components';
import { fetchProducts } from '../redux/slices/productsSlice';
import { createNewInvoice } from '../services/invoices.services';
import { formatDate } from '../utils/dateFormatter';
// -------------------------------------------------------
const CreateInvoice = () => {

    const dispatch = useDispatch();
    const { vanProducts, loading, error } = useSelector(state => state.products);

    const createInvoiceSchema = Yup.object().shape({

        customer_id: Yup.mixed().required('العميل مطلوب').nullable(true),
        invoice_number: Yup.string(),
        discount: Yup.number().min(0, 'يجب ان يكون الخصم اكبر من 0'),
        due_date: Yup.string(),
        //     products: Yup.array().of(Yup.object().shape({
        //         product_id: Yup.mixed().nullable().required('المنتج مطلوب'),
        //         quantity: Yup.number().required('الكمية مطلوبة'),
        //         price: Yup.number().required('السعر مطلوب')
        //     })).min(1, 'يجب ان يكون هناك منتج واحد على الاقل')
        // });
        // products: Yup.array().of(
        //     Yup.object().shape({
        //         product_id: Yup.mixed().required('المنتج مطلوب'),
        //         quantity: Yup.number()
        //             .required('الكمية مطلوبة')
        //             .test('max-quantity', 'الكمية أكبر من المتاحة', function (value) {
        //                 const productId = this.parent.product_id;
        //                 const product = vanProducts.find((p) => p.product_id === productId);
        //                 return value <= (product?.quantity || 0);
        //             }).min(1, 'الكمية يجب ان تكون اكبر من 0'),
        //         price: Yup.number().required('السعر مطلوب'),
        //     })
        // ).min(1, 'يجب ان يكون هناك منتج واحد على الاقل'),


        products: Yup.array().of(
            Yup.object().shape({
                product_id: Yup.mixed()
                    .nullable()
                    .required('المنتج مطلوب')
                    .test('valid-product', 'المنتج غير صالح', function (value) {
                        return !!vanProducts.find((p) => p.product_id === value.product_id);
                    }),
                quantity: Yup.number()
                    .required('الكمية مطلوبة')
                    .positive('الكمية يجب أن تكون أكبر من صفر')
                    .test('max-quantity', 'الكمية أكبر من المتاحة', function (value) {
                        const productId = this.parent.product_id.product_id;
                        const product = vanProducts.find((p) => p.product_id === productId);
                        return value <= (product?.total_quantity || 0);
                    }),
                price: Yup.number()
                    .required('السعر مطلوب')
                    .positive('السعر يجب أن يكون أكبر من صفر')
                    .test('match-product-price', 'السعر غير صالح', function (value) {
                        const productId = this.parent.product_id.product_id;
                        const product = vanProducts.find((p) => p.product_id === productId);
                        return value === (product?.price || 0);
                    }),
            })
        )
            .min(1, 'يجب ان يكون هناك منتج واحد على الاقل')
            .test('non-empty-products', 'المنتجات تحتوي على قيم افتراضية', (products) =>
                products.every(
                    (product) =>
                        product.product_id &&
                        product.quantity > 0 &&
                        Number(product?.price) > 0
                )),
    });


    // const createInvoiceSchema = Yup.object().shape({
    //     customer_id: Yup.mixed().required('العميل مطلوب').nullable(true),
    //     invoice_number: Yup.string(),
    //     discount: Yup.number().min(0, 'يجب ان يكون الخصم اكبر من 0'),
    //     due_date: Yup.string(),
    //     products: Yup.array()
    //         .of(
    //             Yup.object().shape({
    //                 product_id: Yup.mixed()
    //                     .nullable()
    //                     .required('المنتج مطلوب')
    //                     .test('valid-product', 'المنتج غير صالح', function (value) {
    //                         return !!vanProducts.find((p) => p.product_id === value.product_id);
    //                     }),
    //                 quantity: Yup.number()
    //                     .required('الكمية مطلوبة')
    //                     .positive('الكمية يجب أن تكون أكبر من صفر')
    //                     .test('max-quantity', 'الكمية أكبر من المتاحة', function (value) {
    //                         const productId = this.parent.product_id.product_id;
    //                         const product = vanProducts.find((p) => p.product_id === productId);
    //                         return value <= (product?.total_quantity || 0);
    //                     }),
    //                 price: Yup.number()
    //                     .required('السعر مطلوب')
    //                     .positive('السعر يجب أن يكون أكبر من صفر')
    //                     .test('match-product-price', 'السعر غير صالح', function (value) {
    //                         const productId = this.parent.product_id.product_id;
    //                         const product = vanProducts.find((p) => p.product_id === productId);
    //                         return value === (product?.price || 0);
    //                     }),
    //             })
    //         )
    //         .min(1, 'يجب ان يكون هناك منتج واحد على الاقل')
    //         .test('non-empty-products', 'المنتجات تحتوي على قيم افتراضية', (products) =>
    //             products.every(
    //                 (product) =>
    //                     product.product_id &&
    //                     product.quantity > 0 &&
    //                     Number(product?.price) > 0
    //             )
    //         ),
    // });
    const [customers, setCustomers] = useState([]);

    const defaultValues = {
        customer_id: null,
        due_date: null,
        discount: 0,
        products: [{
            product_id: '',
            quantity: 0,
            price: 0
        }]
    }

    const methods = useForm({
        resolver: yupResolver(createInvoiceSchema),
        defaultValues,
    }

    );

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isLoading, },
    } = methods;

    const watchedProducts = watch('products');

    const { fields, append, remove, } = useFieldArray({
        control,
        name: 'products'
    })

    const handleAddProduct = () => {
        append({
            product_id: '',
            quantity: 0,
            price: 0
        });

    }
    const handleRemoveProduct = (index) => {
        remove(index);
    }

    useEffect(() => {
        getAllCustomers().then(res => {
            if (res && res.length > 0) setCustomers(res);
        });

        // TODO: handle van in redux
        dispatch(fetchProducts(6));

    }, [dispatch]);

    const [selectedProductsDetails, setSelectedProductsDetails] = useState(null);


    useEffect(() => {

        setSelectedProductsDetails(
            watchedProducts.map((product) => {
                const selectedProduct = vanProducts.find((p) => p.product_id === product.product_id.product_id);
                return {
                    ...selectedProduct,
                };
            })
        );

    }, [watchedProducts, watchedProducts[watchedProducts.length - 1]?.product_id, vanProducts]);


    const onSubmit = async (data) => {
        console.log("errors", errors);

        data.customer_id = data.customer_id.id;
        data.due_date = formatDate(data.due_date);

        if (data.products.length) {
            data.products = data.products.map((product) => {
                return {
                    ...product,
                    product_id: product.product_id.product_id,
                }
            })
        }
        console.log("data", data);


        try {
            await createNewInvoice(data).then((res) => {
                alert(res?.message);
            })
        } catch (err) {
            console.log(err);
            alert("error");
        }

    }

    return (

        <Container>
            <Typography variant="h4" >انشاء فاتورة جديدة</Typography>
            <Grid2
                container
                spacing={2}
            >
                <Grid2 size={{ xs: 12, sm: 9 }}>

                    <Paper sx={{ p: 2 }}>

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box
                                    rowGap={3}
                                    columnGap={2}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        sm: 'repeat(2, 1fr)',
                                    }}
                                >
                                    <>
                                        <FormAutoComplete
                                            name="customer_id"
                                            control={methods.control}
                                            label="العميل"
                                            options={customers}
                                        />

                                        <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', mt: 2 }}>
                                            {/* TODO: add customer modal */}
                                            <Button variant='outlined' color='info' onClick={() => { console.log("click") }} > اضافة عميل؟</Button>
                                        </Box>
                                    </>
                                    <FormTextField
                                        name="invoice_number"
                                        control={methods.control}
                                        label="ادخال رقم الفاتورة يدويا"
                                        helperText="ادخل الرقم يدويا ان كانت الفاتورة قديمة ولا توجد فى النظام او اتركها وسيتم انشاء رقم فاتورة تلقائيا"
                                    />
                                    <FormDatePicker
                                        name="due_date"
                                        control={methods.control}
                                        label="تاريخ استحقاق الفاتورة"
                                    />

                                    <FormTextField
                                        name="discount"
                                        control={methods.control}
                                        label="التخفيض"
                                    />


                                </Box>
                                {fields.map((field, index) => {
                                    const selectedProduct = watch(`products.${index}.product_id`);
                                    const quantity = watch(`products.${index}.quantity`) || 0;
                                    console.log("field", field);

                                    return (
                                        <Box
                                            rowGap={3}
                                            columnGap={2}
                                            display="grid"
                                            gridTemplateColumns={{
                                                xs: 'repeat(2, 1fr)',
                                                sm: 'repeat(5, 1fr)',
                                            }}
                                            key={field.id}
                                            sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: '1px 1px 1px 1px #eee', alignItems: 'flex-end', justifyContent: 'center' }}
                                        >
                                            <FormAutoComplete
                                                name={`products.${index}.product_id`}
                                                control={control}
                                                label="المنتج"
                                                options={vanProducts}
                                                fullWidth
                                                getOptionLabel={(option) => option.product_name || ''}
                                                isOptionEqualToValue={(option, value) => option.product_id === value?.product_id}
                                                onChange={(e, value) => {
                                                    methods.setValue(`products.${index}.product_id`, value || null);
                                                    methods.setValue(`products.${index}.price`, value?.price || 0);
                                                }}

                                            />
                                            <FormTextField
                                                name={`products.${index}.quantity`}
                                                control={control}
                                                label="الكمية"
                                                inputProps={{
                                                    max: selectedProduct?.total_quantity || 0,
                                                }}
                                            />

                                            {selectedProduct?.price && <FormTextField
                                                name={`products.${index}.price`}
                                                control={control}
                                                label="سعر القطعة"
                                                disabled
                                                value={selectedProduct?.price || 0}
                                            />}

                                            <Typography sx={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', marginTop: '8px' }}>
                                                المجموع: <Typography component="span" variant="h5" color='secondary'>  {selectedProduct?.price && quantity ? quantity * selectedProduct.price : 0}</Typography>

                                            </Typography>
                                            <Box>
                                                <Button type="button" variant="text" onClick={() => handleAddProduct({ product_id: null, quantity: 0, price: 0 })}>
                                                    اضافة منتج اخر
                                                </Button>
                                                {(index > 0) && <Button type="button" variant="text" color="error" onClick={() => handleRemoveProduct(index)}>
                                                    حذف هذا المنتج
                                                </Button>}
                                            </Box>
                                        </Box>
                                    );
                                })}

                                <Box display="flex" justifyContent="flex-end" alignItems="center" columnGap={2} mt={2}>
                                    <Button type="button" variant="contained" color="info" onClick={() => { console.log("Print") }}>Print</Button>
                                    <Button type="submit" variant="contained" color="secondary" disabled={isLoading}>حفظ</Button>
                                </Box>
                            </form>
                        </FormProvider>

                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 3 }}>
                    <Paper sx={{p:2}}>
                        <Typography variant="h6" >تفاصيل المنتجات :   </Typography>
                        <TableContainer >
                            <Table  stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>اسم المنتج</TableCell>
                                        <TableCell align="right">العدد المتاح</TableCell>
                                        <TableCell align="right"> سعر الواحدة</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(selectedProductsDetails && selectedProductsDetails.length) && selectedProductsDetails?.map((row) => (
                                        <TableRow
                                            key={row.product_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{row.product_name}</TableCell>
                                            <TableCell align="right">{row.total_quantity}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default CreateInvoice