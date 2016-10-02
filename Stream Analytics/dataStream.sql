------------------------------------------------------------------
-------------------Cold path data aquisition----------------------
SELECT
    *
INTO
    [DataStorage]
FROM
    [IoTHub]

-----------------------------------------------------------------
-------------------Hot path - power BI query---------------------
SELECT 
  i.accx,
  i.accy,
  i.accz,
  DATEADD ( millisecond , i.timestamp,DATETIMEFROMPARTS (1970, 1, 1, 0, 0, 0, 0)) as [timestamp],
  i.IoTHub.ConnectionDeviceId   
INTO
    [PBI]
FROM
    [IoTHub] i

-------------------------------------------------------------------
------------------- Alarms and warnings ---------------------------
Select 
    i.IoTHub.ConnectionDeviceId,   
    DATEADD ( millisecond , i.timestamp,DATETIMEFROMPARTS (1970, 1, 1, 0, 0, 0, 0)) as [timestamp],
    CONCAT('Wykryto przeciążenie - aktualne wartości przyśpieszeń x=',TRY_CAST ( i.accx as nvarchar(max)),' y=',TRY_CAST(i.accy  as nvarchar(max)),' z=',TRY_CAST(i.accz  as nvarchar(max))) as Message
 INTO
    [PBIEvents]
 FROM
    [IoTHub] i
 WHERE
    ABS(i.accx)>1.5 OR ABS(i.accy)>1.5 OR ABS(i.accz) >1.5

-------------------------------------------------------------------
-----------------Work Check----------------------------------------
SELECT System.TimeStamp AS WindowEnd, 
case when AVG(i.accx)>1 then 1 when AVG(i.accx)<-1 then -1 else 0 end as XMovement,
case when AVG(i.accy)>1 then 1 when AVG(i.accy)<-1 then -1 else 0 end as YMovement,
case when AVG(i.accz)>1 then 1 when AVG(i.accz)<-1 then -1 else 0 end as ZMovement,
 COUNT(*) as WorkNumber
INTO PBIWorkTime
FROM [IoTHub] i
GROUP BY TumblingWindow(Duration(minute, 1), Offset(millisecond, -1))
