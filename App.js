import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome"
import { useFormik } from "formik";
import * as Yup from "yup";
import DateTimePicker from '@react-native-community/datetimepicker'
import allDatas from "../dummy/datas.json"
import DropDownPicker from "react-native-dropdown-picker";



const myApp = () => {

  const Gender = ['male', 'female']

  const States = ['tamil nadu', 'kerela', 'karanataka', ' andhra pradhesh']


  const [datePicker, setDatePicker] = useState(false)

  const [date, setDate] = useState(new Date())

  const [dropOpen, setDropOpen] = useState(false)

  const districts = allDatas

  const dropdown = [{ label: 'ss', value: 'ss' }, { label: 't', value: 't' }, { label: 'y', value: 'y' }]




  const onDateSelected = (event, value) => {
    setDate(value)
    setDatePicker(false)
  }

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .trim()
      .min(3, 'Invalid Name!')
      .required('Name is Required'),
    email: Yup
      .string()
      .email('Invalid email')
      .required('Email is Required'),
    password: Yup
      .string()
      .trim()
      // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      // .matches(/\d/, "Password must have a number")
      // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(4, ({ min }) => `password must be at least ${min} characters`)
      .max(10, ({ max }) => `password must be at least ${max} characters`)
      .required('Password is required'),
    conformPassword: Yup
      .string()
      .equals([Yup.ref('password'), null], 'Password doesnt match')
      // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      // .matches(/\d/, "Password must have a number")
      // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(4, ({ min }) => `Password must be at least ${min} characters`)
      .max(10, ({ max }) => `Password must be at least ${max} characters`)
      .required('Conform Password is required'),
    phoneNumber: Yup
      .string()
      .matches(/(\d){10}\b/, 'Enter the valid Mobile number')
      .matches('^[6-9][0-9]*$', 'Enter the valid  number')
      .required('Phone Number is required')
      .max(10, 'Invalid Number'),
    gender: Yup
      .string()
      .required("Gender is Required"),
    states: Yup
      .string()
      .required("Atleast one states should be selected"),
    selectDistricts: Yup
      .string()
      .when('succes', (succes, schema) => {
        if (succes[0])
          return schema.required(Errors.required)
      })
  })
  const handleSubmit = (values) => {
    console.log(values);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      conformPassword: "",
      phoneNumber: "",
      gender: "",
      states: "",
      selectDistricts: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (

    <View>
      <ScrollView>
        <View >
          <Text style={{ fontSize: 20, justifyContent: "center", alignSelf: "center", fontWeight: "800", color: "black" }}>Your Tickets</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Name *</Text>
            <TextInput placeholder=""
              onChangeText={formik.handleChange('name')}
              placeholderTextColor="blue"
              style={styles.textInputStyle}
              value={formik.values?.name}
              onBlur={formik.handleBlur('name')}
            />
            <Text style={styles.errorText}>{formik.touched.name && formik.errors.name}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Email Address *</Text>
            <TextInput placeholder=""
              onChangeText={formik.handleChange('email')}
              placeholderTextColor="blue"
              style={styles.textInputStyle}
              autoCapitalize='none'
              value={formik.values?.email}
              onBlur={formik.handleBlur('email')}
            />

            <Text style={styles.errorText}>{formik.touched.email && formik.errors.email}</Text>

          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Password *</Text>
            <TextInput placeholder=""
              onChangeText={formik.handleChange('password')}
              placeholderTextColor="blue"
              style={styles.textInputStyle}
              value={formik.values?.password}
              onBlur={formik.handleBlur('password')}
            />
            <Text style={styles.errorText}>{formik.touched.password && formik.errors.password}</Text>

          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Confirm Password *</Text>
            <TextInput placeholder=""
              onChangeText={formik.handleChange('conformPassword')}
              placeholderTextColor="blue"
              style={styles.textInputStyle}
              value={formik.values?.conformPassword}
              onBlur={formik.handleBlur('conformPassword')}
            />
            <Text style={styles.errorText}>{formik.touched.conformPassword && formik.errors.conformPassword}</Text>

          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Phone Number *</Text>
            <TextInput placeholder=""
              onChangeText={formik.handleChange('phoneNumber')}
              placeholderTextColor="blue"
              style={styles.textInputStyle}
              value={formik.values?.phoneNumber}
              onBlur={formik.handleBlur('phoneNumber')}
              keyboardType="numeric"
            />
            <Text style={styles.errorText}>{formik.touched.phoneNumber && formik.errors.phoneNumber}</Text>
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Date Of Birth</Text>
            <Text style={{ fontSize: 16, color: 'black', marginTop: 45, marginBottom: 10, position: "absolute", marginLeft: 80, fontWeight: "800" }}>{date.toLocaleDateString()}</Text>

            {datePicker && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'android' ? 'spinner' : 'default'}
                onChange={onDateSelected}
              />
            )}
            {!datePicker && (
              <View style={styles.placeholderText}>
                <Icon name="calendar" size={25} onPress={setDatePicker} style={{ marginTop: 12, marginLeft: 40, color: "black" }}></Icon>
              </View>
            )}
          </View>

          <View style={{ left: 40, top: 10 }}>
            <Text style={styles.placeholderText}>Gender *</Text>
            <View >
              {
                Gender.map((maf, i) => (
                  <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckBox
                      checked={maf == formik.values.gender}
                      checkedIcon={'dot-circle-o'}
                      uncheckedIcon={"circle-o"}
                      checkedColor="black"
                      uncheckedColor="black"
                      onPress={() => formik.setFieldValue('gender', maf)}
                    />
                    <Text style={{ textTransform: "capitalize", alignSelf: "center", color: "black", fontSize: 16, fontWeight: "800" }}>{maf}</Text>
                  </View>
                ))
              }
              <Text style={styles.errorText}>{formik.touched.gender && formik.errors.gender}</Text>
            </View>
          </View>

          <View style={{ left: 40, top: 1 }}>
            <Text style={styles.placeholderText}>States *</Text>
            <View >
              {
                States.map((sts, j) => (
                  <View key={j} style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckBox
                      checked={sts == formik.values.states}
                      checkedIcon={'check-circle'}
                      uncheckedIcon={'circle-o'}
                      checkedColor="black"
                      uncheckedColor="black"
                      onPress={() => formik.setFieldValue('states', sts)}
                    />
                    <Text style={{ textTransform: "capitalize", alignSelf: "center", color: "black", fontSize: 15, fontWeight: "800" }}>{sts}</Text>
                  </View>
                ))
              }
              <Text style={styles.errorText}>{formik.touched.states && formik.errors.states}</Text>
            </View>
          </View>

          {/* Code for DropDownPicker */}
          <View style={styles.inputContainer}>
            <DropDownPicker
              name="selectDistricts"
              listMode="SCROLLVIEW"
              items={formik.values.states ? districts[formik.values.states] : districts.AndhraPradhesh}
              open={dropOpen}
              setOpen={setDropOpen}
              value={formik.values.selectDistricts}
              onSelectItem={(item)=> formik.setFieldValue('selectDistricts', item.value)}
            />
            {console.log(formik.values.states ? districts[formik.values.states] : districts.TamilNadu)}
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
              <Text style={styles.headingStyle} >REGISTER</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

    </View>
  )

}
const styles = StyleSheet.create({
  headingStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white"
  },
  inputContainer: {
    width: "80%",
    height: 60,
    alignSelf: "center",
    marginTop: 10,
  },
  placeholderText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "space-between",
    top: 7,
  },
  textInputStyle: {
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "blue",
    fontSize: 15
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "blue",
    marginTop: 18,
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 6,
    borderRadius: 10,
    bottom: 15,
  },
  genderText: {
    marginLeft: 42,
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 16,
    color: "black"
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    bottom: 8,
    top: 1
  }
});

export default myApp;
// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// function App() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Apple', value: 'apple' },
//     { label: 'Banana', value: 'banana' }
//   ]);

//   return (
//     <View>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//       />
//     </View>
//   );
// }


// export default App;
