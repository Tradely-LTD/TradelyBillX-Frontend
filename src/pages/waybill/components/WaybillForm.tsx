import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Stepper from './Stepper';
import { Step, FormValues } from '../types';
import Input from '@/common/input/input';
import Button from '@/common/button/button';
import SelectComponent from '@/common/input/select';
import { Calendar, Clock } from 'iconsax-react';

const DriverVehicleInfo: React.FC = () => (
  <div className="rounded-[15px] border border-[#F0F2F4] p-[20px] flex justify-between gap-[20px] flex-1">
    <div className="flex gap-[10px]">
      <img src="truck.png" className="h-[48px] w-[48px]" />
      <div>
        <div className="text-[18px] font-semibold">
          Driver and Vehicle Information
        </div>
        <div className="text-[#64748B]">
          We need to check the driver and vehicle information for verification.
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-[20px] w-1/2">
      <Input
        label="Driver's Name"
        name="driverName"
        placeholder="Victor Osimhen"
      />
      <Input
        label="Driver's Phone Number"
        name="driverPhone"
        placeholder="+234 00-000-000"
      />
      <Input
        label="Vehicle Number"
        name="vehicleNumber"
        placeholder="Type vehicle number"
      />
    </div>
  </div>
);

const ShipmentDetails: React.FC = () => (
  <div className="flex flex-col rounded-[15px] border border-[#F0F2F4] p-[20px] ">
    <div className="flex justify-between gap-[20px] flex-1">
      <div className="flex gap-[10px]">
        <img src="logistics.png" className="h-[48px] w-[48px]" />
        <div>
          <div className="text-[18px] font-semibold">Shipment Information</div>
          <div className="text-[#64748B]">
            We need to verify where the loading location and delivery location
            of the shipment will be.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] w-1/2">
        <div className="space-y-4">
          <h3 className="font-medium">Loading Location</h3>
          <SelectComponent
            onChange={() => {}}
            options={[]}
            label="Select state"
          />

          <SelectComponent
            onChange={() => {}}
            options={[]}
            label="Select LGA"
          />

          <SelectComponent
            onChange={() => {}}
            options={[]}
            label="Select town/city"
          />

          <Input
            label="Market/Location"
            name="loadingMarket"
            placeholder="Type full address"
          />
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="font-medium">Delivery Location</h3>
          <SelectComponent
            onChange={() => {}}
            options={[]}
            label="Select state"
          />

          <SelectComponent
            onChange={() => {}}
            options={[]}
            label="Select LGA"
          />

          <SelectComponent
            onChange={() => {}}
            options={[]}
            label="Select town/city"
          />

          <Input
            label="Market/Location"
            name="deliveryMarket"
            placeholder="Type full address"
          />
          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Departure Detail</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Date"
                      type="date"
                      name="departureDate"
                      placeholder="dd/mm/yyyy"
                      rightIcon={
                        <Calendar size="20" color="#64748b" variant="Bold" />
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Time"
                      type="time"
                      name="departureTime"
                      placeholder="00:00"
                      rightIcon={
                        <Clock size="20" color="#64748b" variant="Bold" />
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Arrival Detail</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Date"
                      type="date"
                      name="arrivalDate"
                      placeholder="dd/mm/yyyy"
                      rightIcon={
                        <Calendar size="20" color="#64748b" variant="Bold" />
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Time"
                      type="time"
                      name="arrivalTime"
                      placeholder="00:00"
                      rightIcon={
                        <Clock size="20" color="#64748b" variant="Bold" />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-between gap-[20px] flex-1 mt-[30px]">
      <div className="flex gap-[10px]">
        <img src="child.png" className="h-[48px] w-[48px]" />
        <div>
          <div className="text-[18px] font-semibold">
            Owner & Receiver Information
          </div>
          <div className="text-[#64748B]">
            For ease of delivery, please include the name of the owner and
            recipient of the goods.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] w-1/2">
        <div className="space-y-4">
          <Input
            label="Goods Owner's Name"
            name="loadingMarket"
            placeholder="Type full name"
          />

          <Input
            label="Goods Receiver's Name"
            name="loadingMarket"
            placeholder="Type full name"
          />
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails: React.FC = () => (
  <div>{/* Add Product Details fields here */}</div>
);

const PaymentDetails: React.FC = () => (
  <div>{/* Add Payment Details fields here */}</div>
);

const steps: Step[] = [
  { label: 'Driver/Vehicle Information', component: DriverVehicleInfo },
  { label: 'Shipment Details', component: ShipmentDetails },
  { label: 'Product Details', component: ProductDetails },
  { label: 'Payment Details', component: PaymentDetails },
];

const initialValues: FormValues = {
  driverName: '',
  driverPhone: '',
  vehicleNumber: '',
  // Add other fields as needed
};

const WaybillForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handleNext = () => {
    setDirection('next');
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection('prev');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (values: FormValues) => {
    console.log('Form Data:', values);
    // Handle form submission
  };

  const CurrentStepComponent = steps[step].component;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <Stepper steps={steps} currentStep={step} />

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={step}
              timeout={300}
              classNames={`slide-${direction}`}>
              <div className="mt-4">
                <CurrentStepComponent />
              </div>
            </CSSTransition>
          </SwitchTransition>

          <div className="flex justify-between mt-8">
            {step > 0 && (
              <Button type="button" onClick={handlePrev}>
                Previous
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WaybillForm;
