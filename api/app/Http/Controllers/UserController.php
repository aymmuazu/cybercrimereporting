<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|different:current_password|confirmed',
        ]);

        $user = auth()->user();
        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json(['error' => 'The current password is incorrect.'], 422);
        }
        $user->password = bcrypt($request->input('new_password'));
        $user->save();

        return response()->json(['message' => 'Password updated successfully.'], 200);
    }

    public function addReport(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'incident_date' => 'required|date',
            'location' => 'required|string|max:255',
            'evidence' => 'nullable|file|mimes:jpg,png,pdf,doc,docx',
            'contact' => 'nullable|string|max:255',
        ]);

        $report = new Report();
        $report->title = $validatedData['title'];
        $report->description = $validatedData['description'];
        $report->category = $validatedData['category'];
        $report->incident_date = $validatedData['incident_date'];
        $report->location = $validatedData['location'];
        $report->contact = $validatedData['contact'] ?? null;
        $report->user_id = auth()->user()->id;

        if ($request->hasFile('evidence')) {
            $report->evidence = $request->file('evidence')->store('evidence');
        }

        $report->save();

        return response()->json(['message' => 'Report submitted successfully.']);   
    }

    public function getReport()
    {
        $reports = Report::where('user_id', auth()->user()->id)->get();

        return response()->json([
            'message' => 'Reports retrieved successfully.',
            'reports' => $reports
        ]);   

    }

    public function getSingleReport($id)
    {
        $report = Report::where('user_id', auth()->user()->id)
                        ->where('id', $id)
                        ->first();
        
        if (!$report) {
            return response()->json([
                'message' => 'No Report found.',
            ], 500);    
        }
        return response()->json([
            'message' => 'Report retrieved successfully.',
            'report' => $report
        ]);   

    }

    public function deleteReport(Request $request, $deleteReportId)
    {
        $report = Report::find($deleteReportId);
        if (!$report) {
            return response()->json([
                'message' => 'Report already deleted or not found.',
            ]);
        }
        $report->delete();
        return response()->json([
            'message' => 'Report deleted successfully.',
        ], 200);
    }

    public function editReport($id, Request $request)
    {
        $report = Report::where('user_id', auth()->user()->id)
                        ->where('id', $id)
                        ->first();
        
        if (!$report) {
            return response()->json([
                'message' => 'No Report found.',
            ], 404);    
        }

        dd($request->file('evidence'));
        

        // Update the report fields
        $report->title = request('title', $request->title);
        $report->description = request('description', $request->description);
        $report->category = request('category', $request->category);
        $report->incident_date = request('incident_date', $request->incident_date);
        $report->location = request('location', $request->location);

        if ($request->hasFile('evidence')) {
            $report->evidence = $request->file('evidence')->store('evidence');
        }

        $report->contact = request('contact', $request->contact);
        $report->save();

        return response()->json([
            'message' => 'Report updated successfully.',
            'report' => $report
        ]);
    }


}
