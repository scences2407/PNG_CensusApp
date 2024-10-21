import * as SQLite from 'expo-sqlite';
import { ReactNode, SetStateAction } from 'react';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: string; // Consider using a Date type depending on your date format
  gender: string;
  province: string;
  district: string;
  llg: string;
  ward: string;
  censusUnitType: string;
  workloadNo: string;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      gender TEXT NOT NULL,
      province TEXT NOT NULL,          -- Add province
      district TEXT NOT NULL,         -- Add district
      llg TEXT NOT NULL,              -- Add LLG
      ward TEXT NOT NULL,             -- Add ward
      censusUnitType TEXT NOT NULL,   -- Add census unit type
      workloadNo TEXT NOT NULL         -- Add workload number
    );
  `);
};

export const addPerson = async (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  date: string,
  gender: string,
  province: string,
  district: string,
  llg: string,
  ward: string,
  censusUnitType: string,
  workloadNo: string
) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO person (firstName, lastName, phone, email, date, gender, province, district, llg, ward, censusUnitType, workloadNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      firstName, lastName, phone, email, date, gender, province, district, llg, ward, censusUnitType, workloadNo
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  date: string,
  gender: string,
  province: string,
  district: string,
  llg: string,
  ward: string,
  censusUnitType: string,
  workloadNo: string
) => {
  try {
    await db.runAsync(
      'UPDATE person SET firstName = ?, lastName = ?, phone = ?, email = ?, date = ?, gender = ?, province = ?, district = ?, llg = ?, ward = ?, censusUnitType = ?, workloadNo = ? WHERE id = ?', 
      firstName, lastName, phone, email, date, gender, province, district, llg, ward, censusUnitType, workloadNo, id
    );
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};
               