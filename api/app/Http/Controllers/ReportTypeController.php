<?php

namespace App\Http\Controllers;

use App\Models\ReportType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReportTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function getReportType()
    {
        $reportsType = ReportType::orderBy('id', 'desc')->get();

        return response()->json([
            'message' => 'Reports Type retrieved successfully.',
            'data' => $reportsType ? $reportsType : null
        ]);

    }

    public function addReportType(Request $request)
    {
        $request->validate([ 'title' => 'required' ]);

        $reportType = ReportType::create([
            'title' => $request->title
        ]);

        return response()->json([
            'message' => 'All Report Type added successfully.',
            'Report Type' => $reportType
        ]);
        
    }

   public function deleteReportType($id)
    {
        try {
            $reportType = ReportType::findOrFail($id);
            $reportType->delete();

            return response()->json([
                'success' => true,
                'message' => 'Report type deleted successfully.',
            ], 200);
        } catch (\Exception $e) {            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete report type. ' . $e->getMessage(),
            ], 500);
        }
    }
}
