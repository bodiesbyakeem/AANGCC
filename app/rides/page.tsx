"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Category = "Ride" | "Meeting" | "Event";

interface RideEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: Category;
  description: string;
  meetAt?: string;
  postRide?: string;
  miles?: string;
  elevation?: string;
}

const INITIAL_EVENTS: RideEvent[] = [
  {
    id: "1",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-04-04",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-04-11",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "3",
    title: "Group Ride — Buescher State Park",
    date: "2026-04-18",
    time: "9:00 a.m.",
    category: "Ride" as Category,
    miles: "22 Miles",
    elevation: "1,584 Feet Elev.",
    description: "Route: Buescher State Park",
    meetAt: "100 Park Road C
Smithville, Texas 78957",
    postRide: "Comfort Cafe
111 NW 1st Street
Smithville, TX 78957",
  },
  {
    id: "4",
    title: "Mandatory Team Meeting",
    date: "2026-04-24",
    time: "5:30 - 6:30 p.m.",
    category: "Meeting" as Category,
    description: "Mandatory team meeting for all AANGCC members.",
    meetAt: "8140 Ceberry Drive #B
Austin, Texas 78759",
  },
  {
    id: "5",
    title: "2026 Texas Bike MS-150 — Day 1 | AUS-LG",
    date: "2026-04-25",
    time: "6:15 a.m.",
    category: "Event" as Category,
    description: "2026 Texas Bike MS-150 · Day 1 from Austin to La Grange.",
    meetAt: "San Jacinto Parking Garage
2400 San Jacinto Blvd.
Austin, Texas 78701",
  },
  {
    id: "6",
    title: "2026 Texas Bike MS-150 — Day 2 | LG-CST",
    date: "2026-04-26",
    time: "6:15 a.m.",
    category: "Event" as Category,
    description: "2026 Texas Bike MS-150 · Day 2 from La Grange to the coast.",
    meetAt: "Fayette County Fairgrounds
1899 N. Jefferson Street
La Grange, Texas 78945",
  },
  {
    id: "sat-may1",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-05-09",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sat-may2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-05-16",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sat-may3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-05-23",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sat-may4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-05-30",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-6",
    title: "Group Ride — Bicycle House",
    date: "2026-06-06",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-6",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-06-07",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-6-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-06-13",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-6-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-06-20",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-6-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-06-27",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-7",
    title: "Group Ride — Bicycle House",
    date: "2026-07-04",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-7",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-07-05",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-7-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-07-11",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-7-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-07-18",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-7-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-07-25",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-8",
    title: "Group Ride — Bicycle House",
    date: "2026-08-01",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-8",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-08-02",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-8-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-08-08",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-8-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-08-15",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-8-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-08-22",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-8-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-08-29",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-9",
    title: "Group Ride — Bicycle House",
    date: "2026-09-05",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-9",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-09-06",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-9-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-09-12",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-9-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-09-19",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-9-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-09-26",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-10",
    title: "Group Ride — Bicycle House",
    date: "2026-10-03",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-10",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-10-04",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-10-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-10-10",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "alz-2026",
    title: "Ride to End ALZ",
    date: "2026-10-17",
    time: "8:00 a.m.",
    category: "Event" as Category,
    miles: "40 Miles",
    elevation: "2,434 Feet Elev.",
    description: "Ride to End ALZ — Annual charity ride supporting the Alzheimer's Association.",
    meetAt: "Speeding Springs
7100 Creek Road
Dripping Springs, Texas 78620",
    postRide: "Onsite — Sponsored by H.E.B.
7100 Creek Road
Dripping Springs, Texas 78620",
  },
  {
    id: "gov-2026-10-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-10-24",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-10-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-10-31",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-11",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-11-01",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-11",
    title: "Group Ride — Bicycle House",
    date: "2026-11-07",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-11-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-11-14",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-11-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-11-21",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-11-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-11-28",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2026-12",
    title: "Group Ride — Bicycle House",
    date: "2026-12-05",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2026-12",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-12-06",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-12-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-12-12",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-12-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-12-19",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2026-12-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-12-26",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-1",
    title: "Group Ride — Bicycle House",
    date: "2027-01-02",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-1",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-01-03",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-1-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-01-09",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-1-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-01-16",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-1-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-01-23",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-1-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-01-30",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-2",
    title: "Group Ride — Bicycle House",
    date: "2027-02-06",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-02-07",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-2-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-02-13",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-2-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-02-20",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-2-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-02-27",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-3",
    title: "Group Ride — Bicycle House",
    date: "2027-03-06",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-03-07",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-3-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-03-13",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-3-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-03-20",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-3-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-03-27",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-4",
    title: "Group Ride — Bicycle House",
    date: "2027-04-03",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-04-04",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-4-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-04-10",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-4-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-04-17",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "ms150-2027-day1",
    title: "2027 Texas Bike MS-150 — Day 1 | AUS-LG",
    date: "2027-04-24",
    time: "6:15 a.m.",
    category: "Event" as Category,
    description: "2027 Texas Bike MS-150 · Day 1 from Austin to La Grange.",
    meetAt: "San Jacinto Parking Garage
2400 San Jacinto Blvd.
Austin, Texas 78701",
  },
  {
    id: "ms150-2027-day2",
    title: "2027 Texas Bike MS-150 — Day 2 | LG-CST",
    date: "2027-04-25",
    time: "6:15 a.m.",
    category: "Event" as Category,
    description: "2027 Texas Bike MS-150 · Day 2 from La Grange to the coast.",
    meetAt: "Fayette County Fairgrounds
1899 N. Jefferson Street
La Grange, Texas 78945",
  },
  {
    id: "bh-2027-5",
    title: "Group Ride — Bicycle House",
    date: "2027-05-01",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-05-02",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-5-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-05-08",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-5-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-05-15",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-5-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-05-22",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-5-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-05-29",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-6",
    title: "Group Ride — Bicycle House",
    date: "2027-06-05",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-6",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-06-06",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-6-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-06-12",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-6-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-06-19",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-6-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-06-26",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-7",
    title: "Group Ride — Bicycle House",
    date: "2027-07-03",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-7",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-07-04",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-7-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-07-10",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-7-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-07-17",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-7-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-07-24",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-7-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-07-31",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-8",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-08-01",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-8",
    title: "Group Ride — Bicycle House",
    date: "2027-08-07",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-8-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-08-14",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-8-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-08-21",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-8-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-08-28",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-9",
    title: "Group Ride — Bicycle House",
    date: "2027-09-04",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-9",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-09-05",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-9-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-09-11",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-9-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-09-18",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-9-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-09-25",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-10",
    title: "Group Ride — Bicycle House",
    date: "2027-10-02",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-10",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-10-03",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-10-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-10-09",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "alz-2027",
    title: "Ride to End ALZ",
    date: "2027-10-16",
    time: "8:00 a.m.",
    category: "Event" as Category,
    miles: "40 Miles",
    elevation: "2,434 Feet Elev.",
    description: "Ride to End ALZ — Annual charity ride supporting the Alzheimer's Association.",
    meetAt: "Speeding Springs
7100 Creek Road
Dripping Springs, Texas 78620",
    postRide: "Onsite — Sponsored by H.E.B.
7100 Creek Road
Dripping Springs, Texas 78620",
  },
  {
    id: "gov-2027-10-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-10-23",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-10-5",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-10-30",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-11",
    title: "Group Ride — Bicycle House",
    date: "2027-11-06",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-11",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-11-07",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-11-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-11-13",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-11-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-11-20",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-11-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-11-27",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "bh-2027-12",
    title: "Group Ride — Bicycle House",
    date: "2027-12-04",
    time: "7:00 a.m.",
    category: "Ride" as Category,
    miles: "40 Miles",
    description: "Route: Bicycle House Group Ride",
    meetAt: "Bicycle House
4318 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "sun-2027-12",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-12-05",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-12-2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-12-11",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-12-3",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-12-18",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  },
  {
    id: "gov-2027-12-4",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2027-12-25",
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park
5200 Bolm Road
Austin, Texas 78721",
    postRide: "Monkey Nest Coffee
5353 Burnet Road
Austin, Texas 78757",
  }
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const ADMIN_PASSWORD = "AANGCC2026";

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
  Ride:    { bg: "bg-white/20", text: "text-white", dot: "bg-white" },
  Meeting: { bg: "bg-[#FFD84D]/30", text: "text-[#FFD84D]", dot: "bg-[#FFD84D]" },
  Event:   { bg: "bg-black/20", text: "text-white", dot: "bg-white" },
};

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function formatDate(year: number, month: number, day: number) { return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }

function EventModal({ event, onClose }: { event: RideEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl max-w-[520px] w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="h-[4px] w-full bg-[#FFD84D]" />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{event.category}</span>
          <h3 className="font-heading text-[#111111] text-[22px] font-semibold mt-4 mb-2 leading-tight">{event.title}</h3>
          <div className="flex items-center gap-3 text-[#888] text-[13px] mb-5">
            <span>{new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span><span>{event.time}</span>
          </div>
          {(event.miles || event.elevation) && (
            <div className="flex gap-3 mb-5">
              {event.miles && <div className="px-3 py-1.5 rounded-lg bg-[#14CFC4]/10 text-[#0FAFA5] text-[13px] font-semibold">🚴 {event.miles}</div>}
              {event.elevation && <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-[#666] text-[13px] font-semibold">⛰️ {event.elevation}</div>}
            </div>
          )}
          {event.description && <p className="text-[#555] text-[14px] leading-relaxed mb-4">{event.description}</p>}
          {event.meetAt && (
            <div className="mb-4">
              <div className="text-[#aaa] text-[11px] tracking-wide uppercase font-medium mb-1">Meet At</div>
              <p className="text-[#444] text-[13px] leading-relaxed whitespace-pre-line">{event.meetAt}</p>
            </div>
          )}
          {event.postRide && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-[#FFD84D] text-[11px] tracking-wide uppercase font-semibold mb-1">Post Ride Social</div>
              <p className="text-[#444] text-[13px] leading-relaxed whitespace-pre-line">{event.postRide}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = () => { if (pw === ADMIN_PASSWORD) { onSuccess(); } else { setError(true); setPw(""); } };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl max-w-[380px] w-full overflow-hidden shadow-2xl">
        <div className="h-[4px] w-full bg-[#FFD84D]" />
        <div className="p-8 flex flex-col gap-5">
          <h3 className="font-heading text-[#111111] text-[22px] font-semibold">Admin Access</h3>
          <input type="password" placeholder="Password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }} onKeyDown={e => e.key === "Enter" && handleSubmit()} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4]" />
          {error && <p className="text-red-500 text-[13px]">Incorrect password.</p>}
          <button onClick={handleSubmit} className="w-full py-3 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFC800] transition-colors duration-300">Unlock</button>
        </div>
      </motion.div>
    </div>
  );
}

function AdminForm({ onAdd, onClose }: { onAdd: (e: RideEvent) => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: "", date: "", time: "", category: "Ride" as Category, description: "", meetAt: "", postRide: "", miles: "", elevation: "" });
  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors";
  const handleSubmit = () => { if (!form.title || !form.date || !form.time) return; onAdd({ ...form, id: Date.now().toString() }); onClose(); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl max-w-[560px] w-full overflow-hidden shadow-2xl my-8" onClick={e => e.stopPropagation()}>
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-[#111111] text-[22px] font-semibold">Add New Event</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Title *</label><input className={inputClass} placeholder="Event title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Date *</label><input type="date" className={inputClass} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Time *</label><input className={inputClass} placeholder="8:00 a.m." value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Category</label>
              <select className={inputClass + " cursor-pointer"} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as Category }))}>
                <option value="Ride">Ride</option><option value="Meeting">Meeting</option><option value="Event">Event</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Miles</label><input className={inputClass} placeholder="26 Miles" value={form.miles} onChange={e => setForm(p => ({ ...p, miles: e.target.value }))} /></div>
            <div className="sm:col-span-2 flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Elevation</label><input className={inputClass} placeholder="866 Feet Elev." value={form.elevation} onChange={e => setForm(p => ({ ...p, elevation: e.target.value }))} /></div>
            <div className="sm:col-span-2 flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Description</label><textarea className={inputClass + " resize-none"} rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
            <div className="sm:col-span-2 flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Meet At</label><textarea className={inputClass + " resize-none"} rows={3} value={form.meetAt} onChange={e => setForm(p => ({ ...p, meetAt: e.target.value }))} /></div>
            <div className="sm:col-span-2 flex flex-col gap-1.5"><label className="text-[#888] text-[11px] uppercase tracking-wide">Post Ride Social</label><textarea className={inputClass + " resize-none"} rows={3} value={form.postRide} onChange={e => setForm(p => ({ ...p, postRide: e.target.value }))} /></div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={!form.title || !form.date || !form.time} className={`flex-1 py-3 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${form.title && form.date && form.time ? "bg-[#14CFC4] text-white hover:bg-[#0FAFA5]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>Add Event</button>
            <button onClick={onClose} className="px-6 py-3 rounded-xl border border-gray-200 text-[#888] text-[13px] hover:border-gray-400 hover:text-[#444] transition-colors">Cancel</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CalendarGrid({ year, month, events, onSelectEvent }: { year: number; month: number; events: RideEvent[]; onSelectEvent: (e: RideEvent) => void }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const eventsByDate = useMemo(() => { const map: Record<string, RideEvent[]> = {}; events.forEach(ev => { if (!map[ev.date]) map[ev.date] = []; map[ev.date].push(ev); }); return map; }, [events]);
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="grid grid-cols-7 bg-[#0FAFA5]">
        {DAYS.map(d => <div key={d} className="py-3 text-center text-[11px] font-semibold tracking-[0.1em] uppercase text-white/80">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - firstDay + 1;
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
          const dateStr = isCurrentMonth ? formatDate(year, month, dayNum) : "";
          const dayEvents = dateStr ? (eventsByDate[dateStr] || []) : [];
          const isToday = dateStr === today;
          return (
            <div key={i} className={`min-h-[90px] p-2 border-b border-r border-gray-100 ${!isCurrentMonth ? "bg-gray-50/50" : "bg-white"} ${i % 7 === 6 ? "border-r-0" : ""}`}>
              {isCurrentMonth && (
                <>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium mb-1 ml-auto ${isToday ? "bg-[#14CFC4] text-white font-bold" : "text-[#999]"}`}>{dayNum}</div>
                  <div className="flex flex-col gap-1">
                    {dayEvents.slice(0, 3).map(ev => (
                      <button key={ev.id} onClick={() => onSelectEvent(ev)} className={`w-full text-left px-2 py-1 rounded-lg text-[10px] font-medium truncate ${ev.category === "Meeting" ? "bg-[#FFD84D]/20 text-[#8a7000]" : ev.category === "Event" ? "bg-black/10 text-[#333]" : "bg-[#14CFC4]/15 text-[#0FAFA5]"} hover:opacity-80 transition-opacity`}>
                        {ev.title}
                      </button>
                    ))}
                    {dayEvents.length > 3 && <button onClick={() => onSelectEvent(dayEvents[3])} className="text-[10px] text-[#aaa] hover:text-[#666] text-left pl-2">+{dayEvents.length - 3} more</button>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UpcomingEvents({ events, onSelectEvent }: { events: RideEvent[]; onSelectEvent: (e: RideEvent) => void }) {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Upcoming</h3>
      {upcoming.map(ev => {
        const d = new Date(ev.date + "T12:00:00");
        return (
          <button key={ev.id} onClick={() => onSelectEvent(ev)} className="w-full text-left p-4 rounded-xl bg-white/15 border border-white/20 hover:bg-white/25 transition-all duration-200 group">
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${ev.category === "Meeting" ? "bg-[#FFD84D]" : ev.category === "Event" ? "bg-orange-400" : "bg-white"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-white text-[13px] font-medium truncate">{ev.title}</div>
                <div className="text-white/55 text-[11px] mt-0.5">{d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {ev.time}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function RidesPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<RideEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<RideEvent | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");

  const filteredEvents = filterCategory === "All" ? events : events.filter(e => e.category === filterCategory);
  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="min-h-screen pt-[80px]">
      {/* Hero */}
      <section className="relative py-20">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10 bg-white/50" />
              <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Get Out & Ride</span>
              <span className="h-[1px] w-10 bg-white/50" />
            </div>
            <h1 className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
              Ride <span className="text-gradient-gold">Calendar</span>
            </h1>
            <p className="text-white/75 text-[16px] max-w-[500px] mx-auto leading-relaxed">
              From weekly group rides to major charity events — find your next ride and show up ready to roll.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="relative py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Calendar */}
            <div className="lg:col-span-9">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <h2 className="font-heading text-white text-[22px] font-semibold min-w-[200px] text-center">{MONTHS[month]} {year}</h2>
                  <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {(["All", "Ride", "Meeting", "Event"] as const).map(cat => (
                    <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-all duration-200 ${filterCategory === cat ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>{cat}</button>
                  ))}
                  <button onClick={() => isAdmin ? setShowAdminForm(true) : setShowAdminLogin(true)} className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-white/30 bg-white/10 text-white text-[11px] font-semibold tracking-wide hover:bg-white/20 transition-all duration-200">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    {isAdmin ? "Add Event" : "Admin"}
                  </button>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mb-5">
                {(["Ride", "Meeting", "Event"] as Category[]).map(cat => (
                  <div key={cat} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${cat === "Meeting" ? "bg-[#FFD84D]" : cat === "Event" ? "bg-orange-400" : "bg-white"}`} />
                    <span className="text-white/60 text-[12px]">{cat}</span>
                  </div>
                ))}
              </div>

              <CalendarGrid year={year} month={month} events={filteredEvents} onSelectEvent={setSelectedEvent} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <UpcomingEvents events={filteredEvents} onSelectEvent={setSelectedEvent} />
              <div className="mt-8 flex flex-col gap-3">
                <h3 className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Quick Links</h3>
                {[
                  { label: "MS 150 Team", href: "/rides/ms150" },
                  { label: "Ride to End ALZ", href: "/rides/alz" },
                  { label: "Rosedale Ride", href: "/rides/rosedale" },
                  { label: "Ride Levels", href: "/rides/levels" },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-3 p-4 rounded-xl bg-white/15 border border-white/20 hover:bg-white/25 transition-colors duration-200">
                    <div className="w-2 h-2 rounded-full bg-[#FFD84D]" />
                    <span className="text-white/80 text-[13px] hover:text-white transition-colors duration-200">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        {showAdminLogin && <AdminLogin onSuccess={() => { setIsAdmin(true); setShowAdminLogin(false); setShowAdminForm(true); }} />}
        {showAdminForm && isAdmin && <AdminForm onAdd={(ev) => setEvents(prev => [...prev, ev])} onClose={() => setShowAdminForm(false)} />}
      </AnimatePresence>
    </div>
  );
}
