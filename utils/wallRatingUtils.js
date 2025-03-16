/**
 * Wall Rating Utility Functions
 * Contains functions for analyzing fire door compliance based on wall ratings
 */

/**
 * Convert door/wall rating text to minutes
 */
export function convertRatingToMinutes(ratingText) {
  if (!ratingText) return null;
  
  // Check for "No label" or similar phrases
  if (ratingText.includes("No label") || 
      ratingText.includes("not required") || 
      ratingText.includes("Not required")) {
    return 0;
  }
  
  // Extract hour rating
  const hourMatch = ratingText.match(/(\d+)\s*hour/i);
  if (hourMatch) {
    return parseInt(hourMatch[1]) * 60;
  }
  
  // Extract minute rating
  const minuteMatch = ratingText.match(/(\d+)\s*min/i);
  if (minuteMatch) {
    return parseInt(minuteMatch[1]);
  }
  
  // Handle special cases
  if (ratingText.includes("4H") || ratingText.includes("4 hour") || ratingText.includes("4-hour")) {
    return 240;
  }
  if (ratingText.includes("3H") || ratingText.includes("3 hour") || ratingText.includes("3-hour")) {
    return 180;
  }
  if (ratingText.includes("2H") || ratingText.includes("3/2HOUR") || ratingText.includes("2 hour") || ratingText.includes("2-hour")) {
    return 120;
  }
  if (ratingText.includes("1-1/2H") || ratingText.includes("1.5 hour") || ratingText.includes("90 min")) {
    return 90;
  }
  if (ratingText.includes("1H") || ratingText.includes("1/3HOUR") || ratingText.includes("1 hour") || ratingText.includes("1-hour")) {
    return 60;
  }
  if (ratingText.includes("45 min") || ratingText.includes("3/4H") || ratingText.includes("3/4 hour") || ratingText.includes("0.75 hour")) {
    return 45;
  }
  if (ratingText.includes("30 min") || ratingText.includes("1/2H") || ratingText.includes("1/2 hour") || ratingText.includes("0.5 hour")) {
    return 30;
  }
  if (ratingText.includes("20 min") || ratingText.includes("1/3H") || ratingText.includes("1/3 hour") || ratingText.includes("0.33 hour")) {
    return 20;
  }
  
  // For specific barrier types that imply ratings
  if (ratingText.includes("Smoke Barrier")) {
    return 20;  // Smoke barriers are 20-minute equivalent
  }
  if (ratingText.includes("Suite Boundaries")) {
    return 20;  // Suite boundaries are 20-minute equivalent
  }
  if (ratingText.includes("Hazardous")) {
    return 20;  // Hazardous areas are 20-minute equivalent
  }
  
  return null; // Could not determine rating
}

/**
 * Check if a wall type only requires a 20-minute opening with no label
 */
export function is20MinuteOpeningNoLabelRequired(wallRating) {
  if (!wallRating) return false;
  
  return (
    wallRating.includes("Smoke Barrier") || 
    (wallRating.includes("1 hour") && wallRating.includes("Smoke Barrier")) ||
    wallRating.includes("Suite Boundaries") ||
    wallRating.includes("Hazardous") ||
    wallRating.includes("Suite/Smoke")
  );
}

/**
 * Check if this is a 1-hour Fire Smoke barrier (requires 45-min or higher)
 */
export function isFireSmokeBarrier(wallRating) {
  if (!wallRating) return false;
  
  return (
    wallRating.includes("Fire") && 
    wallRating.includes("Smoke") && 
    wallRating.includes("1 hour")
  );
}

/**
 * Check if a frame has the special "Label present, rating not specified" designation
 * (Treated as a 4-hour frame rating)
 */
export function isFrameRatingUnspecified(frameRating) {
  if (!frameRating) return false;
  
  return frameRating.includes("Label present, rating not specified");
}

/**
 * Check door and frame compliance with wall rating requirements
 */
export function checkRatingCompliance(wallRating, doorRating, frameRating) {
  const wallMinutes = convertRatingToMinutes(wallRating);
  
  // Skip if we couldn't determine the wall rating
  if (wallMinutes === null) return { compliant: true, reason: "Could not determine wall rating" };
  
  // Handle special cases
  const twentyMinNoLabel = is20MinuteOpeningNoLabelRequired(wallRating);
  const fireSmoke = isFireSmokeBarrier(wallRating);
  const frameUnspecified = isFrameRatingUnspecified(frameRating);
  
  // Convert ratings to minutes
  const doorMinutes = convertRatingToMinutes(doorRating);
  const frameMinutes = frameUnspecified ? 240 : convertRatingToMinutes(frameRating);
  
  // Determine required minutes
  const requiredMinutes = fireSmoke ? 45 : (twentyMinNoLabel ? 20 : Math.round(wallMinutes * 0.75));
  
  // Check door compliance
  let doorCompliant = true;
  if (doorMinutes !== null) {
    if (twentyMinNoLabel) {
      // 20-minute opening requirements
      doorCompliant = doorRating.includes("not required") || doorMinutes >= 20;
    } else if (fireSmoke) {
      // 1-hour Fire Smoke requirements
      doorCompliant = doorMinutes >= 45;
    } else {
      // Standard 75% rule
      doorCompliant = doorMinutes >= wallMinutes * 0.75;
    }
  }
  
  // Check frame compliance
  let frameCompliant = true;
  if (frameMinutes !== null) {
    if (frameUnspecified) {
      // Frame with "Label present, rating not specified" is always compliant (4-hour)
      frameCompliant = true;
    } else if (twentyMinNoLabel) {
      // 20-minute opening requirements
      frameCompliant = frameRating.includes("not required") || frameMinutes >= 20;
    } else if (fireSmoke) {
      // 1-hour Fire Smoke requirements
      frameCompliant = frameMinutes >= 45;
    } else {
      // Standard 75% rule
      frameCompliant = frameMinutes >= wallMinutes * 0.75;
    }
  }
  
  // Determine overall compliance and reason
  let compliant = doorCompliant && frameCompliant;
  let reason = "";
  
  if (!doorCompliant && !frameCompliant) {
    reason = "Both door and frame are insufficiently rated";
  } else if (!doorCompliant) {
    reason = "Door is insufficiently rated";
  } else if (!frameCompliant) {
    reason = "Frame is insufficiently rated";
  }
  
  return {
    compliant,
    reason,
    details: {
      wallMinutes,
      doorMinutes,
      frameMinutes,
      requiredMinutes,
      twentyMinNoLabel,
      fireSmoke,
      frameUnspecified
    }
  };
}

/**
 * Check if a deficiency is incorrectly citing a missing label
 * when the opening type doesn't require labels
 */
export function isFalseDeficiency(wallRating, deficiency) {
  if (!wallRating || !deficiency) return false;
  
  // Check if this is a 20-minute opening with no label requirement
  const is20MinOpening = is20MinuteOpeningNoLabelRequired(wallRating);
  
  // Check if the deficiency is about missing labels
  const isAboutMissingLabel = deficiency.includes("missing label") || 
                             deficiency.includes("No label");
  
  // If it's a 20-min opening and the deficiency is about missing labels, it's a false deficiency
  return is20MinOpening && isAboutMissingLabel;
}
