import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database";

const Dashboard = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("Select Gender");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  
  // New state variables for additional inputs
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [llg, setLlg] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [censusUnitType, setCensusUnitType] = useState<string>("");
  const [workloadNo, setWorkloadNo] = useState<string>("");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (
      !name ||
      !lastName ||
      !phone ||
      !email ||
      gender === "Select Gender" ||
      !province ||
      !district ||
      !llg ||
      !ward ||
      !censusUnitType ||
      !workloadNo
    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingPersonId) {
        await updatePerson(
          editingPersonId,
          name,
          lastName,
          phone,
          email,
          date.toISOString(),
          gender,
          province,
          district,
          llg,
          ward,
          censusUnitType,
          workloadNo
        );
        console.log("Person updated successfully");
      } else {
        const id = await addPerson(
          name,
          lastName,
          phone,
          email,
          date.toISOString(),
          gender,
          province,
          district,
          llg,
          ward,
          censusUnitType,
          workloadNo
        );
        console.log("Person created successfully with ID:", id);
      }
      resetForm();
      fetchPersons();
    } catch (error) {
      console.error("Error submitting person:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      console.log("Person deleted successfully");
      fetchPersons();
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleUpdateClick = (person: Person) => {
    setName(person.firstName);
    setLastName(person.lastName);
    setPhone(person.phone);
    setEmail(person.email);
    setGender(person.gender);
    setDate(new Date(person.date)); 
    setProvince(person.province);
    setDistrict(person.district);
    setLlg(person.llg);
    setWard(person.ward);
    setCensusUnitType(person.censusUnitType);
    setWorkloadNo(person.workloadNo);
    setEditingPersonId(person.id);
  };

  const resetForm = () => {
    setName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setGender("Select Gender");
    setDate(new Date());
    setProvince("");
    setDistrict("");
    setLlg("");
    setWard("");
    setCensusUnitType("");
    setWorkloadNo("");
    setEditingPersonId(null);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Data Entry Form</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Province"
          value={province}
          onChangeText={(text) => setProvince(text)}
          placeholderTextColor="#888"
        />
        
        <TextInput
          style={styles.input}
          placeholder="District"
          value={district}
          onChangeText={(text) => setDistrict(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Local Level Government (LLG)"
          value={llg}
          onChangeText={(text) => setLlg(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Ward"
          value={ward}
          onChangeText={(text) => setWard(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Census Unit Type"
          value={censusUnitType}
          onChangeText={(text) => setCensusUnitType(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Workload No."
          value={workloadNo}
          onChangeText={(text) => setWorkloadNo(text)}
          placeholderTextColor="#888"
        />

        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={"Select Gender"} value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <View>
          <Button
            title="Select Date of Birth"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.dateText}>
            Date of Birth: {date.toDateString()}
          </Text>
        </View>

        <Button
          title={editingPersonId ? "Update" : "Submit"}
          onPress={handleSubmit}
        />

        {/* Table to display records */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>First Name</Text>
            <Text style={styles.tableHeaderText}>Last Name</Text>
            <Text style={styles.tableHeaderText}>Phone</Text>
            <Text style={styles.tableHeaderText}>Email</Text>
            <Text style={styles.tableHeaderText}>Province</Text>
            <Text style={styles.tableHeaderText}>District</Text>
            <Text style={styles.tableHeaderText}>LLG</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
          {persons.map((person) => (
            <View key={person.id} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{person.firstName}</Text>
              <Text style={styles.tableRowText}>{person.lastName}</Text>
              <Text style={styles.tableRowText}>{person.phone}</Text>
              <Text style={styles.tableRowText}>{person.email}</Text>
              <Text style={styles.tableRowText}>{person.province}</Text>
              <Text style={styles.tableRowText}>{person.district}</Text>
              <Text style={styles.tableRowText}>{person.llg}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleUpdateClick(person)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(person.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
  },
  buttonText: {
    color: "#007bff",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default Dashboard;
