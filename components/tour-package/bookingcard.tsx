import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  IndianRupee,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

interface BookNowCardProps {
  basePrice: number;
  finalPrice: number;
  discountPercentage: number;
  includeGst: boolean;
  perPersonCost?: number;
  duration: string;
  startLocation: string;
  endLocation: string;
  onBookNow?: () => void;
  onGroupBooking?: () => void;
  onCall?: () => void;
  onChat?: () => void;
}

export function BookNowCard({
  basePrice,
  finalPrice,
  discountPercentage,
  includeGst,
  perPersonCost,
  duration,
  startLocation,
  endLocation,
  onBookNow,
  onGroupBooking,
  onCall,
  onChat,
}: BookNowCardProps) {
  return (
    <Card className="border-0 shadow-xl sticky top-0 overflow-hidden p-0">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h3 className="text-xl font-bold mb-2">Book This Package</h3>
        <p className="text-blue-100 text-sm">Secure your spot today!</p>
      </div>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Price Display */}
          <div>
            {discountPercentage > 0 && (
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-500 line-through">
                  ₹{basePrice?.toLocaleString()}
                </p>
                <Badge className="bg-red-100 text-red-700">
                  Save ₹
                  {(
                    basePrice -
                    finalPrice / (includeGst ? 1.18 : 1)
                  ).toLocaleString()}
                </Badge>
              </div>
            )}

            <div className="flex items-center gap-2">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <span className="text-4xl font-bold text-green-600">
                {finalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              {includeGst && (
                <p className="text-sm text-slate-500">Including GST</p>
              )}
              {perPersonCost && (
                <p className="text-sm text-slate-600">
                  Per person: ₹{perPersonCost.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Trip Details */}
          <div className="space-y-4 text-sm">
            {[
              { label: "Duration", value: duration },
              { label: "Start Location", value: startLocation },
              { label: "End Location", value: endLocation },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <span className="text-slate-600">{item.label}:</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onBookNow}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-3 shadow-lg hover:shadow-xl transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </Button>

            <Button
              variant="outline"
              onClick={onGroupBooking}
              className="w-full border-2 hover:bg-slate-50"
            >
              <Users className="w-4 h-4 mr-2" />
              Group Booking Inquiry
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onCall}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onChat}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              <strong>Free Cancellation</strong> up to 24 hours before departure
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
