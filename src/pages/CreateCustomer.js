import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, CardHeader, Container,  Paper } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addNewCustomer } from '../services/customers.services';
import { FormTextField } from '../components';

// -------------------------------------------------------
const CreateCustomer = () => {

    const CreateCustomerSchema = Yup.object().shape({
        name: Yup.string(),
        customer_store_name: Yup.string(),
        email: Yup.string().email('يجب ان يكون الايميل صحيح'),
        phone: Yup.string(),
        info: Yup.string(),
        location: Yup.string(),


    });

    const defaultValues = {
        name: '',
        customer_store_name: '',
        email: '',
        phone: '',
        info: '',
        location: '',
    }

    const methods = useForm({
        resolver: yupResolver(CreateCustomerSchema),
        defaultValues,
    }

    );

    const {
        handleSubmit,
        formState: {  isLoading, },
    } = methods;


    const onSubmit = async (data) => {

        console.log("data", data);


        try {
            await addNewCustomer(data).then((res) => {
                alert("تم اضافة العميل بنجاح");
            })
        } catch (err) {
            console.log(err);
            alert("error");
        }

    }

    return (

        <Container>
            <Card>
                <CardHeader title="اضافة عميل جديد" />
                <CardContent>

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

                                    <FormTextField
                                        name="name"
                                        control={methods.control}
                                        label="الاسم"
                                    />
                                    <FormTextField
                                        name="customer_store_name"
                                        control={methods.control}
                                        label="اسم المتجر"
                                    />

                                    <FormTextField
                                        name="email"
                                        control={methods.control}
                                        label="الايميل"
                                    />

                                    <FormTextField
                                        name="phone"
                                        control={methods.control}
                                        label="الهاتف"
                                    />

                                    <FormTextField
                                        name="location"
                                        control={methods.control}
                                        label="العنوان"
                                    />

                                    <FormTextField
                                        name="info"
                                        control={methods.control}
                                        label="تفاصيل اخرى"
                                    />



                                </Box>


                                <Box display="flex" justifyContent="flex-end" alignItems="center" columnGap={2} mt={2}>
                                    <Button type="submit" variant="contained" color="secondary" disabled={isLoading}>حفظ</Button>
                                </Box>
                            </form>
                        </FormProvider>

                    </Paper>
                </CardContent>
            </Card>
        </Container>
    )
}

export default CreateCustomer