const createLogo = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const calculateDuration = (startDate: string, endDate: string): string => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Parse start date
  const startParts = startDate.trim().split(" ");
  let startMonthIndex: number;
  let startYearNum: number;
  const isStartYearOnly = startParts.length === 1;
  
  if (isStartYearOnly) {
    // Year only format (e.g., "2021")
    startMonthIndex = 0; // Default to January
    startYearNum = parseInt(startParts[0]);
  } else {
    // Month and year format (e.g., "Jan 2024")
    startMonthIndex = months.indexOf(startParts[0]);
    startYearNum = parseInt(startParts[1]);
  }
  
  // Parse end date
  let endMonthIndex: number;
  let endYearNum: number;
  let isEndYearOnly = false;
  
  if (endDate.toLowerCase() === "present") {
    const now = new Date();
    endMonthIndex = now.getMonth();
    endYearNum = now.getFullYear();
  } else {
    const endParts = endDate.trim().split(" ");
    isEndYearOnly = endParts.length === 1;
    
    if (isEndYearOnly) {
      // Year only format (e.g., "2025")
      endMonthIndex = 0; // Default to January
      endYearNum = parseInt(endParts[0]);
    } else {
      // Month and year format (e.g., "Mar 2025")
      endMonthIndex = months.indexOf(endParts[0]);
      endYearNum = parseInt(endParts[1]);
    }
  }
  
  // Calculate total months
  let totalMonths = (endYearNum - startYearNum) * 12 + (endMonthIndex - startMonthIndex);
  
  // Only add 1 if at least one date has a specific month
  if (!isStartYearOnly || !isEndYearOnly) {
    totalMonths += 1;
  }
  
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  
  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'Month' : 'Months'}`;
  } else if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'Year' : 'Years'}`;
  } else {
    return `${years} ${years === 1 ? 'Year' : 'Years'} ${remainingMonths} ${remainingMonths === 1 ? 'Month' : 'Months'}`;
  }
};

export { createLogo, calculateDuration };
