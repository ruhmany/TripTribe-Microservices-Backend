using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.Extensions
{
    public static class Mapper
    {
        public static GetTripDetailsDTO MaptripToGetTripDetailsGetTripDetailsDTO(Trip trip)
        {
            var dayDetails = new List<TripDayDetails>();
            foreach (var day in trip.Days)
            {
                var activitiesDetails = MapToActivityDetails(day);
                var dayDetail = new TripDayDetails(date: day.Date, activitiesDetails);
                dayDetails.Add(dayDetail);
            }
            var tripDetails = new GetTripDetailsDTO(tripId: trip.Id.Value.ToString(), owerId: trip.OwnerId.Value.ToString(), title: trip.Title, details: trip.Description, startDate: trip.DateRange.Start, endDate: trip.DateRange.End, DayDetails: dayDetails);
            return tripDetails;
        }
        private static List<TripActivityDetails> MapToActivityDetails(ItineraryDay itineraryDay)
        {
            var resultList = new List<TripActivityDetails>();
            foreach (var activity in itineraryDay.Activities)
            {
                var activityDetails = new TripActivityDetails(title: activity.Title, description: activity.Notes, money: activity.EstimatedCost.Amount, location: activity.Location.Name, startTime: activity.StartTime.Value, endTime: activity.EndTime.Value);
                resultList.Add(activityDetails);
            }
            return resultList;
        }
    }
}
